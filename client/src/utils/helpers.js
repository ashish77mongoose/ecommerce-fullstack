export const imageRender = (url) => {
  return `${process.env.REACT_APP_DEV_API}${url}`;
};
export const numberWithCommas = (number) => {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 20,
  }).format(number);
};
