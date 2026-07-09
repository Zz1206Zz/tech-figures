import './ShinyText.css';

const ShinyText = ({
  text,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  speed = 2,
  delay = 0,
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  disabled = false,
  className = ''
}) => {
  const animationDirection = yoyo
    ? 'alternate'
    : direction === 'right'
      ? 'reverse'
      : 'normal';

  const style = disabled
    ? {
        color,
        WebkitTextFillColor: color
      }
    : {
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 40%, ${shineColor} 50%, ${color} 60%, ${color} 100%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        animationName: 'shiny-text-slide',
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
        animationDirection
      };

  const classes = [
    'shiny-text',
    pauseOnHover ? 'shiny-text--pause-hover' : '',
    disabled ? 'shiny-text--disabled' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} style={style}>
      {text}
    </span>
  );
};

export default ShinyText;
