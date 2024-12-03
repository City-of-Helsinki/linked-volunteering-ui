/* eslint-disable no-console */
import '@testing-library/jest-dom';

window.scrollTo = jest.fn();

const originalError = console.error.bind(console.error);

console.error = (msg, ...optionalParams) => {
  const msgStr = msg.toString();

  return (
    !msgStr.includes('Could not parse CSS stylesheet') && originalError(msg, ...optionalParams)
  );
};
