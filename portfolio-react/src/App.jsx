import GridScan from './components/GridScan/GridScan';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="gridscan-container">
        <GridScan
          sensitivity={0.5}
          lineThickness={1}
          linesColor="#2F293A"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.5}
        />
      </div>
      <div className="content">
        <h1>GridScan Demo</h1>
        <p>移动鼠标试试 — 3D网格扫描背景交互效果</p>
      </div>
    </div>
  );
}

export default App;
