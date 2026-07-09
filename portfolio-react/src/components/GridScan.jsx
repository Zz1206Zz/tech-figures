import * as faceapi from 'face-api.js';
import { BloomEffect, ChromaticAberrationEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const vert = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uTilt;
uniform float uYaw;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uLineStyle;
uniform float uLineJitter;
uniform float uScanOpacity;
uniform float uScanDirection;
uniform float uNoise;
uniform float uBloomOpacity;
uniform float uScanGlow;
uniform float uScanSoftness;
uniform float uPhaseTaper;
uniform float uScanDuration;
uniform float uScanDelay;
varying vec2 vUv;

uniform float uScanStarts[8];
uniform float uScanCount;

const int MAX_SCANS = 8;

float smoother01(float a, float b, float x){
  float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    vec3 ro = vec3(0.0);
    vec3 rd = normalize(vec3(p, 2.0));

    float cR = cos(uTilt), sR = sin(uTilt);
    rd.xy = mat2(cR, -sR, sR, cR) * rd.xy;

    float cY = cos(uYaw), sY = sin(uYaw);
    rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;

    vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
    rd.xy += skew * rd.z;

    vec3 color = vec3(0.0);
  float minT = 1e20;
  float gridScale = max(1e-5, uGridScale);
    float fadeStrength = 2.0;
    vec2 gridUV = vec2(0.0);

  float hitIsY = 1.0;
    for (int i = 0; i < 4; i++)
    {
        float isY = float(i < 2);
        float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
        float num = pos - (isY * ro.y + (1.0 - isY) * ro.x);
        float den = isY * rd.y + (1.0 - isY) * rd.x;
        float t = num / den;
        vec3 h = ro + rd * t;

        float depthBoost = smoothstep(0.0, 3.0, h.z);
        h.xy += skew * 0.15 * depthBoost;

    bool use = t > 0.0 && t < minT;
    gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
    minT = use ? t : minT;
    hitIsY = use ? isY : hitIsY;
    }

    vec3 hit = ro + rd * minT;
    float dist = length(hit - ro);

  float jitterAmt = clamp(uLineJitter, 0.0, 1.0);
  if (jitterAmt > 0.0) {
    vec2 j = vec2(
      sin(gridUV.y * 2.7 + iTime * 1.8),
      cos(gridUV.x * 2.3 - iTime * 1.6)
    ) * (0.15 * jitterAmt);
    gridUV += j;
  }
  float fx = fract(gridUV.x);
  float fy = fract(gridUV.y);
  float ax = min(fx, 1.0 - fx);
  float ay = min(fy, 1.0 - fy);
  float wx = fwidth(gridUV.x);
  float wy = fwidth(gridUV.y);
  float halfPx = max(0.0, uLineThickness) * 0.5;

  float tx = halfPx * wx;
  float ty = halfPx * wy;

  float aax = wx;
  float aay = wy;

  float lineX = 1.0 - smoothstep(tx, tx + aax, ax);
  float lineY = 1.0 - smoothstep(ty, ty + aay, ay);
  if (uLineStyle > 0.5) {
    float dashRepeat = 4.0;
    float dashOn = 0.4;
    float dashX = smoothstep(dashOn, dashOn + 0.1, fract(gridUV.x * dashRepeat));
    float dashY = smoothstep(dashOn, dashOn + 0.1, fract(gridUV.y * dashRepeat));
    lineX *= dashX;
    lineY *= dashY;
  } else if (uLineStyle > 1.5) {
    float dotSize = 0.15;
    float dx = smoothstep(dotSize, dotSize + 0.1, ax);
    float dy = smoothstep(dotSize, dotSize + 0.1, ay);
    lineX = 1.0 - dx * dy;
    lineY = 0.0;
  }
  float lines = clamp(lineX + lineY, 0.0, 1.0);
  float fade = exp(-dist * fadeStrength);
  color += lines * uLinesColor * fade;

  for (int i = 0; i < MAX_SCANS; i++) {
    if (float(i) >= uScanCount) break;
    float scanStart = uScanStarts[i];
    float phase = (iTime - scanStart) / uScanDuration;
    if (phase < 0.0 || phase > 1.0) continue;
    
    float dir = uScanDirection;
    if (dir > 0.5 && dir < 1.5) phase = 1.0 - phase;
    else if (dir > 1.5) phase = abs(2.0 * phase - 1.0);
    
    float taper = uPhaseTaper;
    float fadeIn = smoother01(0.0, taper, phase);
    float fadeOut = smoother01(1.0 - taper, 1.0, phase);
    float envelope = fadeIn * fadeOut;
    
    float scanY = mix(-1.5, 1.5, phase);
    float distToScan = abs(hit.y - scanY);
    
    float glow = uScanGlow;
    float soft = uScanSoftness;
    float scanIntensity = exp(-distToScan * (2.0 + glow)) * (1.0 + glow);
    scanIntensity *= smoothstep(soft, 0.0, distToScan);
    scanIntensity *= envelope;
    
    color += uScanColor * scanIntensity * uScanOpacity * fade;
  }

  float noiseAmt = uNoise;
  if (noiseAmt > 0.0) {
    float n = fract(sin(dot(fragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    color += n * noiseAmt * 0.1;
  }

  fragColor = vec4(color, 1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

function GridScan({
  sensitivity = 0.55,
  lineThickness = 1,
  linesColor = '#2F293A',
  gridScale = 0.1,
  scanColor = '#FF9FFC',
  scanOpacity = 0.4,
  enablePost = true,
  bloomIntensity = 0.6,
  chromaticAberration = 0.002,
  noiseIntensity = 0.01,
  enableWebcam = false,
  showPreview = false,
  lineStyle = 'solid',
  lineJitter = 0.1,
  bloomThreshold = 0,
  bloomSmoothing = 0,
  scanDirection = 'pingpong',
  scanSoftness = 2,
  scanGlow = 0.5,
  scanPhaseTaper = 0.9,
  scanDuration = 2.0,
  scanDelay = 2.0,
  enableGyro = false,
  scanOnClick = false,
  snapBackDelay = 250,
}) {
  const meshRef = useRef();
  const composerRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [input, setInput] = useState({ tilt: 0, yaw: 0, skewX: 0, skewY: 0 });
  const [scanStarts, setScanStarts] = useState([]);
  const [activeScans, setActiveScans] = useState([]);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const videoRef = useRef();
  const faceIntervalRef = useRef();

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const nx = (x - 0.5) * 2;
        const ny = (y - 0.5) * 2;

        setInput((prev) => ({
          tilt: prev.tilt * 0.9 + ny * sensitivity * 0.3,
          yaw: prev.yaw * 0.9 + nx * sensitivity * 0.3,
          skewX: prev.skewX * 0.9 + nx * sensitivity * 0.15,
          skewY: prev.skewY * 0.9 + ny * sensitivity * 0.15,
        }));
      }
    };

    const handleClick = () => {
      if (scanOnClick) {
        const now = performance.now() / 1000;
        setScanStarts((prev) => [...prev.slice(-7), now]);
      }
    };

    const handleGyro = (e) => {
      if (!enableGyro) return;
      const { beta, gamma } = e;
      setInput((prev) => ({
        tilt: prev.tilt * 0.9 + (beta - 45) * 0.005 * sensitivity,
        yaw: prev.yaw * 0.9 + gamma * 0.005 * sensitivity,
        skewX: prev.skewX * 0.9 + gamma * 0.002 * sensitivity,
        skewY: prev.skewY * 0.9 + (beta - 45) * 0.002 * sensitivity,
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('deviceorientation', handleGyro);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', handleGyro);
    };
  }, [sensitivity, scanOnClick, enableGyro]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = performance.now() / 1000;
      setScanStarts((prev) => [...prev.slice(-7), now]);
    }, (scanDuration + scanDelay) * 1000);

    setScanStarts([performance.now() / 1000]);

    return () => clearInterval(interval);
  }, [scanDuration, scanDelay]);

  useEffect(() => {
    if (!enableWebcam) return;

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsWebcamActive(true);

          await faceapi.loadFaceDetectionModel('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/models');

          faceIntervalRef.current = setInterval(async () => {
            if (!videoRef.current || !videoRef.current.videoWidth) return;

            const detections = await faceapi.detectAllFaces(videoRef.current);
            if (detections.length > 0) {
              const face = detections[0].box;
              const x = (face.x + face.width / 2) / videoRef.current.videoWidth;
              const y = (face.y + face.height / 2) / videoRef.current.videoHeight;
              const nx = (x - 0.5) * 2;
              const ny = (y - 0.5) * 2;

              setInput((prev) => ({
                tilt: prev.tilt * 0.8 + ny * sensitivity * 0.4,
                yaw: prev.yaw * 0.8 + nx * sensitivity * 0.4,
                skewX: prev.skewX * 0.8 + nx * sensitivity * 0.2,
                skewY: prev.skewY * 0.8 + ny * sensitivity * 0.2,
              }));
            }
          }, 100);
        }
      } catch (err) {
        console.error('Webcam error:', err);
        setIsWebcamActive(false);
      }
    };

    startWebcam();

    return () => {
      if (faceIntervalRef.current) {
        clearInterval(faceIntervalRef.current);
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [enableWebcam, sensitivity]);

  useEffect(() => {
    const handleSnapBack = () => {
      setInput((prev) => ({
        tilt: prev.tilt * 0.95,
        yaw: prev.yaw * 0.95,
        skewX: prev.skewX * 0.95,
        skewY: prev.skewY * 0.95,
      }));
    };

    const interval = setInterval(handleSnapBack, snapBackDelay);
    return () => clearInterval(interval);
  }, [snapBackDelay]);

  useEffect(() => {
    const now = performance.now() / 1000;
    const active = scanStarts.filter((s) => now - s < scanDuration + 1);
    setActiveScans(active);
  }, [scanStarts, scanDuration]);

  useEffect(() => {
    if (!meshRef.current || !composerRef.current) return;

    const material = meshRef.current.material;
    const uniforms = material.uniforms;

    uniforms.uTilt.value = input.tilt;
    uniforms.uYaw.value = input.yaw;
    uniforms.uSkew.value.set(input.skewX, input.skewY);
    uniforms.uScanStarts.value = activeScans;
    uniforms.uScanCount.value = activeScans.length;
  }, [input, activeScans]);

  const styleMap = { solid: 0, dashed: 1, dotted: 2 };
  const directionMap = { forward: 0, backward: 1, pingpong: 2 };

  return (
    <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <canvas style={{ width: '100%', height: '100%' }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const canvas = document.querySelector('canvas');
              const ctx = canvas.getContext('2d');
              let width, height;
              let time = 0;
              let input = { tilt: 0, yaw: 0, skewX: 0, skewY: 0 };
              let scanStarts = [];
              let activeScans = [];
              const scanDuration = ${scanDuration};
              const scanDelay = ${scanDelay};
              const sensitivity = ${sensitivity};
              const snapBackDelay = ${snapBackDelay};
              const enableWebcam = ${enableWebcam};
              const scanOnClick = ${scanOnClick};
              const scanColor = '${scanColor}';
              const scanOpacity = ${scanOpacity};
              const linesColor = '${linesColor}';
              const lineThickness = ${lineThickness};
              const gridScale = ${gridScale};
              const noiseIntensity = ${noiseIntensity};
              const bloomIntensity = ${bloomIntensity};
              const chromaticAberration = ${chromaticAberration};
              const lineStyle = '${lineStyle}';
              const lineJitter = ${lineJitter};
              const scanDirection = '${scanDirection}';
              const scanSoftness = ${scanSoftness};
              const scanGlow = ${scanGlow};
              const scanPhaseTaper = ${scanPhaseTaper};

              const styleMap = { solid: 0, dashed: 1, dotted: 2 };
              const directionMap = { forward: 0, backward: 1, pingpong: 2 };

              function resize() {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;
              }

              function smoother01(a, b, x) {
                const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
                return t * t * t * (t * (t * 6 - 15) + 10);
              }

              function hexToRgb(hex) {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                  r: parseInt(result[1], 16) / 255,
                  g: parseInt(result[2], 16) / 255,
                  b: parseInt(result[3], 16) / 255
                } : { r: 1, g: 1, b: 1 };
              }

              const scanRgb = hexToRgb(scanColor);
              const linesRgb = hexToRgb(linesColor);

              function updateInput(e) {
                const x = e.clientX / width;
                const y = e.clientY / height;
                const nx = (x - 0