import { object } from 'dot-object';

/**
 *
 * @param {*} error
 * @returns
 */
export const parseYupError = (error) => {
  const message = {};
  error.inner.forEach((err) => {
    if (!message[err.path]) {
      message[err.path] = err.message;
    }
  });
  console.log(error.inner, 'error');
  return object(message);
};
/**
 *
 * @param {*} error
 * @returns
 */
export const isYupError = (error) => error?.name === 'ValidationError';