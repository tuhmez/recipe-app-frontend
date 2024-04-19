import { format, fraction } from "mathjs";

const oneThirds = ['0.33', '0.333'];
const twoThirds = ['0.66', '0.666'];

export const simplify = (str: string) => { 
  var result = '', data = str.split('/'), 
      numOne = Number(data[0]), 
      numTwo = Number(data[1]); 
  for (var i = Math.max(numOne, numTwo); i > 1; i--) { 
  if ((numOne % i === 0) && (numTwo % i === 0)) { 
      numOne /= i; 
      numTwo /= i; 
  } 
  } 
  if (numTwo === 1) { 
  result = numOne.toString() 
  } else { 
  result = numOne.toString() + '/' + numTwo.toString() 
  } 
  return result 
};

export const formatMeasurement = (measurement: number) => {
  const isDecimal = measurement.toString().includes('.');
  let isOneThird = oneThirds.includes(measurement.toString());
  let isTwoThirds = twoThirds.includes(measurement.toString());

  if (isOneThird) return '1/3';
  if (isTwoThirds) return '2/3';

  if (measurement > 1 && isDecimal) {
    const justWholeNumber = Math.floor(measurement);
    const justFraction = measurement - justWholeNumber;
    
    isOneThird = oneThirds.includes(justFraction.toString());
    isTwoThirds = twoThirds.includes(justFraction.toString());

    let simplifiedFraction;
    if (isOneThird) {
      simplifiedFraction = '1/3';
    } else if (isTwoThirds) {
      simplifiedFraction = '2/3';
    } else {
      simplifiedFraction = simplify(format(fraction(justFraction), { fraction: 'ratio' }));
    }

    return `${justWholeNumber} ${simplifiedFraction}`
  } else {
    return simplify(format(fraction(measurement), { fraction: 'ratio' }));
  }
};