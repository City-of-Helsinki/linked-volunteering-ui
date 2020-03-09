if (typeof window.TextEncoder !== 'function') {
  // eslint-disable-next-line global-require
  const TextEncodingPolyfill = require('text-encoding');
  window.TextEncoder = TextEncodingPolyfill.TextEncoder;
  window.TextDecoder = TextEncodingPolyfill.TextDecoder;
}
