export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString();
};

export const formatTime = (timeStr: string) => {
  return timeStr;
};
