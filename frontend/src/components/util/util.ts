export function handlerDateParse(date: string) {
   const parseDate = new Date(Date.parse(date));
   const formattedDate = parseDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
   });

   return formattedDate;
}
