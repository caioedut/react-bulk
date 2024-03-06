import Platform from '../Platform';

export default function scrollToStart($el, animated: boolean = true) {
  const { web, native } = Platform;

  if (web) {
    $el?.scrollTo({
      top: 0,
      left: 0,
      behavior: animated ? 'smooth' : 'instant',
    });
  }

  if (native) {
    $el?.scrollTo({ x: 0, y: 0, animated });
  }
}
