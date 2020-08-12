import { availableValues } from './constant';

export function check(checkType, value) {
  if (availableValues[checkType].includes(value)) return value;
  else return checkType === 'size' ? 'default' : 'text';
}
