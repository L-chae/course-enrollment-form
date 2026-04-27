export function formatDateRange(startDate: string, endDate: string) {
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return `${formatter.format(new Date(startDate))} ~ ${formatter.format(
    new Date(endDate)
  )}`;
}
