export default function Times({ svg, color = '#000000', size = 16 }) {
  const { Svg, Line } = svg;

  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 256 256">
      <Line
        x1="200"
        y1="56"
        x2="56"
        y2="200"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <Line
        x1="200"
        y1="200"
        x2="56"
        y2="56"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </Svg>
  );
}
