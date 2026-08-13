export interface CollectionSchedule {
  neighborhood: string;
  week_day: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  start_time: string; // Format: "HH:mm"
  end_time: string; // Format: "HH:mm"
}
