export function reMapOptions(arr, value) {
  const options = arr.map(item => {
    const current = value === (item instanceof Object ? item.value : item);
    return item instanceof Object
      ? { ...item, current }
      : { label: item, value: item, current, disabled: false };
  });
  return options;
}

export function mapValueToLabel(options, value) {
  if (options) {
    for (let item of options) if (item.value === value) return item.label;
  }
  return '';
}
