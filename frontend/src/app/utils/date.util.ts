export const startOfTodayUTC = (): string => {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  return start.toISOString();
};

export const endOfTodayUTC = (): string => {
  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  return end.toISOString();
};

export const startOfToday = (): string => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start.toISOString();
};

export const endOfToday = (): string => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end.toISOString();
};
