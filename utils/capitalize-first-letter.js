exports.capitalize = (inputData) => {
  const newInput = inputData.replace(' ', '-').toLowerCase();
  return newInput
    .split('-')
    .map((el) => {
      return el[0].toUpperCase() + el.slice(1);
    })
    .join('-');
};
