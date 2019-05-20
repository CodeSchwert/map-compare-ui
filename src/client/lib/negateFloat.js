export default (number) => {
  if (parseFloat(number) != NaN) {
    return -Math.abs(number);
  } else {
    return NaN;
  }
};
