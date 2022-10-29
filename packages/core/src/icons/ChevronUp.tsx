export default function ChevronRight({ svg, color = '#000000', size = 16 }) {
  const { Svg, Polyline } = svg;

  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 256 256">
      <Polyline points="48 160 128 80 208 160" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    </Svg>
  );
}
