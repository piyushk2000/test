export function toggleItemInArray<A extends { value: number }>(
  array: A[],
  item: A
): any {
  const index = array.findIndex((a) => a.value === item.value);

  if (index === -1) {
    return [...array, item];
  } else {
    return array.filter((a, i) => i !== index);
  }
}

export const isSelected = <T extends { value: number }>(
  id: number,
  array: T[]
): boolean => {
  const index = array.findIndex((a) => a.value === id);

  if (index === -1) {
    return false;
  } else {
    return true;
  }
};
