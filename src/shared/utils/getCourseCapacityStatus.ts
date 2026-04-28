export type CapacityStatus = 'available' | 'low' | 'full';

export const getCourseCapacityStatus = (current: number, max: number): CapacityStatus => {
  const ratio = current / max;
  if (ratio >= 1) return 'full';
  if (ratio >= 0.8) return 'low'; // 80% 이상 차면 '마감 임박'
  return 'available';
};