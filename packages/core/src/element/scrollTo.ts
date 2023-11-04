import Platform from '../Platform';

export default function scrollTo($el, x?: number, y?: number, animated: boolean = true) {
  const { web, native } = Platform;

  if (web) {
    $el?.scrollTo({
      top: y,
      left: x,
      behavior: animated ? 'smooth' : 'instant',
    });
  }

  if (native) {
    $el?.scrollTo({ x, y, animated });
  }
}
