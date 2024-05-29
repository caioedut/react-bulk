export default function CaretUp({ svg, color = '#000000', size = 16 }) {
  const { Svg, Path } = svg;

  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 256 256">
      <Path d="M215.39,163.06A8,8,0,0,1,208,168H48a8,8,0,0,1-5.66-13.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,215.39,163.06Z" />
    </Svg>
  );
}
