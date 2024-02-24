export function capitalize(inputData: string) {
  const newInput = inputData.replace(' ', '-').toLowerCase();
  return newInput
    .split('-')
    .map((el) => {
      return el[0].toUpperCase() + el.slice(1);
    })
    .join('-');
}

export function trim(inputData: string) {
  const newInput = inputData.toLowerCase().split(' ');

  let newInput2 = newInput.map((el) => {
    let newel: any = el.split('-');
    newel = newel
      .map((elm: string) => {
        return elm[0].toUpperCase() + elm.slice(1);
      })
      .join('-');
    return newel;
  });

  newInput2 = newInput2.map((el) => {
    let elem = el.split('/');
    elem = elem
      .map((part: string) => {
        return part[0].toUpperCase() + part.slice(1);
      })
      .join('/');

    return elem;
  });

  return newInput2.join(' ');
}
