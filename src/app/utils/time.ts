export const toSeconds = (string: string) => {
  // string is hh:mm
  const [hour, minute] = string.split(":");

  return +hour * 3600 + +minute * 60;
};
