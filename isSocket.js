export default function (value) {
  if (
    value !== null
    && typeof value === 'object'
    && value.hasOwnProperty('io')
  ) {
    return value && typeof value.io.uri === 'string';
  }

  return false;
}