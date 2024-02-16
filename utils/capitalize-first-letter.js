exports.capitalize = (inputData) => {
  return inputData
    .split('-')
    .map((el) => {
      return el[0].toUpperCase() + el.slice(1);
    })
    .join('-');
};
