export default function CaretRight({ svg, color = '#000000', size = 16 }) {
  const { Svg, Path } = svg;

  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 256 256">
      <Path d="M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z" />
    </Svg>
  );
}
