export const dateFormatter = (date) => {
  return date.split("T").join(" ").slice(0, -8);
};
