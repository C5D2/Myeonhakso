import moment from 'moment';

export function calculateDays(schedule: (string | null)[] | undefined): number {
  if (!schedule || schedule.length < 2 || !schedule[0] || !schedule[1])
    return 0;

  const startDate = moment(schedule[0]);
  const endDate = moment(schedule[1]);

  return endDate.diff(startDate, 'days');
}
