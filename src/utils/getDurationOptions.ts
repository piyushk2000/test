export default function getDurationOptions(min: number, max: number) {
  const durations: {
    value: string;
    label: string;
  }[] = [];

  let i = min;

  while (i <= max) {
    let label = "";

    const hours = Math.floor(i / 60);
    const minutes = i % 60;

    if (hours) {
      if (hours > 1) {
        label += `${hours} Hours`;
      } else {
        label += `${hours} Hour`;
      }
    }

    if (hours && minutes) {
      label += " ";
    }

    if (minutes) {
      label += `${minutes} Mins`;
    }

    durations.push({
      label: label,
      value: i.toString(),
    });

    if (i >= 90) {
      i += 30;
    } else {
      i += 15;
    }
  }

  return durations;
}
