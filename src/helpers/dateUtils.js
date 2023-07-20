export function convertToHoursMinutesSeconds(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSeconds = totalSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return { hours, minutes, seconds };
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Se suma 1 porque los meses en JavaScript son indexados desde 0
  const year = date.getUTCFullYear();

  const formattedDate = `${day < 10 ? "0" : ""}${day}/${
    month < 10 ? "0" : ""
  }${month}/${year}`;

  return formattedDate;
}

export function isOutdated(date) {
  const oneDay = 24 * 60 * 60 * 1000;
  const now = Date.now();
  return now - date > oneDay;
}
