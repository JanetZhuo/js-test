const { httpGet } = require("./mock-http-interface");

const successResponseKey = "Arnie Quote";
const failResponseKey = "FAILURE";

const getSingleArnieQuote = async (url) => {
  try {
    const response = await httpGet(url);
    const { body, status } = response;
    const responseMessage = JSON.parse(body).message;
    const responseKey =
      status === 200 ? [successResponseKey] : [failResponseKey];
    return { [responseKey]: responseMessage };
  } catch ({ message }) {
    console.log(`Error: ${message}`);
  }
};

const getArnieQuotes = async (urls) => {
  const results = await Promise.all(
    urls.map(async (url) => getSingleArnieQuote(url))
  );
  return results;
};

module.exports = {
  getArnieQuotes,
};
