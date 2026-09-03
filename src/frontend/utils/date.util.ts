import { months, weekdays } from "@constants/common";

const formatSchedule = ({
  date,
  start_time,
  end_time,
}: {
  date: string;
  start_time: string;
  end_time: string;
}): string => {
  const d = new Date(date);

  const weekday = weekdays[d.getDay()];
  const day = d.getDate();
  const month = months[d.getMonth()];

  // Format times: "08:00" → "08h00"
  const formatTime = (t: string) => {
    const [h, m] = t.split(":");
    return `${h}h${m}`;
  };

  return `${weekday}, ${day} de ${month} • ${formatTime(start_time)} - ${formatTime(end_time)}`;
};

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);

  const day = d.getDate();
  const month = months[d.getMonth()].slice(0, 3);
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
}

export { formatDateShort, formatSchedule };

