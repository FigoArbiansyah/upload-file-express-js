import "dotenv/config";

export const BASE_URL = process.env.BASE_URL;

export const PRODUCT_URL = `/${BASE_URL}/products`;

export const generateResponse = (message, response, status) => {
  return { status, message, results: response || 200 };
};

export const generateDateFormat = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  return formattedDateTime;
};

export let validationMessage = {};

export const validationRequiredField = (req) => {
  validationMessage = {};
  const keys = Object.keys(req);
  const isRequired = [];
  keys.map((key) => {
    if (!req[key]) {
      validationMessage[key] = `${key} is required`;
      isRequired.push(false);
    } else {
      isRequired.push(true);
    }
  });
  let returnVariable;
  isRequired.map((item) => {
    if (item.toString() == "false") {
      returnVariable = false;
    } else {
      returnVariable = true;
    }
  });
  return returnVariable;
};
