export default function Resize({ svg, color = '#000000', size = 16 }) {
  const { Svg, Line, Rect } = svg;

  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 256 256">
      <Rect width="256" height="256" fill="none" />
      <Line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <Line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </Svg>
  );
}
