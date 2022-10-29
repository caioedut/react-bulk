import Platform from '../Platform';

export default function scrollToEnd($el, animated: boolean = true) {
  const { web, native } = Platform;

  if (web) {
    $el.scrollTo({
      top: $el.scrollHeight,
      left: $el.scrollWidth,
      behavior: animated ? 'smooth' : 'instant',
    });
  }

  if (native) {
    $el.scrollToEnd({ animated });
  }
}
