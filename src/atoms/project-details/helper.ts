const MAX_ITEM = 6;

export function calculateSteps(length: number) {
  return Math.ceil(length / MAX_ITEM);
}

export function getStartPoint(current: number) {
  return MAX_ITEM * (current - 1);
}
export function getEndPoint(current: number) {
  return MAX_ITEM * current;
}
