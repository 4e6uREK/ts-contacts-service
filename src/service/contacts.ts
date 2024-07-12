import { data } from "../data";

export const approximateSearchByEmailAndNumber = (
  email: string,
  number: string,
) => {
  const emailRegex = new RegExp(email, "i");
  const numberRegex = new RegExp(number, "i");
  return data.filter(
    (entry) => emailRegex.test(entry.email) && numberRegex.test(entry.number),
  );
};

export const approximateSearchByEmail = (email: string) => {
  const emailRegex = new RegExp(email, "i");
  return data.filter((entry) => emailRegex.test(entry.email));
};
