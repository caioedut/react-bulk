import Platform from '../Platform';

export default function scrollIntoView($scrollableEl, $targetEl, animated = true) {
  const { web, native } = Platform;

  if (web) {
    $targetEl.scrollIntoView({
      behavior: animated ? 'smooth' : 'instant',
      block: 'start',
      inline: 'start',
    });
  }

  if (native) {
    $targetEl.measureLayout($scrollableEl, (left, top) => {
      $scrollableEl.scrollTo({ x: left, y: top, animated });
    });
  }
}
