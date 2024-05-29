export default function CaretLeft({ svg, color = '#000000', size = 16 }) {
  const { Svg, Path } = svg;

  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 256 256">
      <Path d="M168,48V208a8,8,0,0,1-13.66,5.66l-80-80a8,8,0,0,1,0-11.32l80-80A8,8,0,0,1,168,48Z" />
    </Svg>
  );
}
