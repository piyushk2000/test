export function calculateSteps(length: number, MAX_ITEM: number) {
  return Math.ceil(length / MAX_ITEM);
}

export function getStartPoint(current: number, MAX_ITEM: number) {
  return MAX_ITEM * (current - 1);
}
export function getEndPoint(current: number, MAX_ITEM: number) {
  return MAX_ITEM * current;
}
