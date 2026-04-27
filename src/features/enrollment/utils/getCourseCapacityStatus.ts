export type CourseCapacityStatus = "available" | "limited" | "full";

export function getCourseCapacityStatus(
  maxCapacity: number,
  currentEnrollment: number
): CourseCapacityStatus {
  const remainingSeats = maxCapacity - currentEnrollment;

  if (remainingSeats <= 0) {
    return "full";
  }

  if (remainingSeats <= 5) {
    return "limited";
  }

  return "available";
}

export function getRemainingSeats(maxCapacity: number, currentEnrollment: number) {
  return Math.max(maxCapacity - currentEnrollment, 0);
}
