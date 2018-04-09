// USD CAD 23
// 23 USD is worth 28 CAD. You can spend these in the following countries
// API 사용: fixer.io, restcountries.eu

const axios = require('axios');

// Unable to get exchange rate for USD and CAD.
const getExchangeRate = async (to) => {
  try {
    const response = await axios.get(`http://data.fixer.io/api/latest?access_key=4fe179075e6633f3060882751ed50e09`);
    const rate = response.data.rates[to];

    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for from EUR to ${to}.`);
  }
}

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
  });
};

const convertCurrencyAlt = async (to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(to);
  const exchangedAmount = amount * rate;

  return `${amount} EUR is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

convertCurrencyAlt('USD', 100).then((status) => {
  console.log(status);
}).catch((e) =>
  console.log(e.message);
});
