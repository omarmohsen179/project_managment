export const ConvertToArabicNumbers = (num) => {
  const arabicNumbers =
    "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
  return new String(num).replace(/[0123456789]/g, (d) => {
    return arabicNumbers[d];
  });
};
export const DisplayNumber = (num, i18n) => {
  return i18n.language === "ar" ? ConvertToArabicNumbers(num) : num;
};
const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthsArabic = [
  " يناير ",
  "فبراير ",
  "مارس ",
  "أبريل ",
  "مايو ",
  "يونيو ",
  "يوليو ",
  "أغسطس ",
  "سبتمبر  ",
  "أكتوبر ",
  "نوفمبر ",
  "ديسمبر ",
];
export const DateConvertor = (date, i18n) => {
  if (!date) return "";
  const d = new Date(date);

  return i18n?.language === "en"
    ? d.getDate() +
        " " +
        Months[d.getMonth()] +
        " " +
        d.getFullYear() +
        " " +
        d.getHours() +
        " : " +
        d.getMinutes()
    : ConvertToArabicNumbers(d.getDate()) +
        " " +
        MonthsArabic[d.getMonth()] +
        " " +
        ConvertToArabicNumbers(d.getFullYear()) +
        "  " +
        ConvertToArabicNumbers(d.getHours()) +
        " : " +
        ConvertToArabicNumbers(d.getMinutes());
};
export function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
