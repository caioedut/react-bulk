import crypt from './crypt';

export default function event($el, event, callback, options?) {
  if (!callback.name) {
    const original = callback;
    const name = 'fn_anonym_' + crypt(callback.toString());

    callback = {
      [name](e) {
        return original(e);
      },
    }[name];
  }

  $el.addEventListener(event, callback, options);

  return () => $el.removeEventListener(event, callback);
}
