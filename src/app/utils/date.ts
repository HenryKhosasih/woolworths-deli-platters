export const addDays = (date: Date, days: number) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const toEpochMilli = (epoch: number) => epoch * 1000;
