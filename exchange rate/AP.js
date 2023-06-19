const countryImageOne = document.getElementById("image-one");
const countrySelectionOne = document.getElementById("one-currency");
const swap = document.getElementById("swap");
const countryImageTwo = document.getElementById("image-two");
const countrySelectionTwo = document.getElementById("two-currency");
const rateDom = document.querySelector(".rate");
const button = document.querySelector(".convert-btn");
const amountTwo = document.querySelector(".result-rate");
const amount = document.querySelector("#amount");

// Fetch the available currencies from the API
const fetchCurrencies = async () => {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,currencies"
    );
    const data = await res.json();

    const countries = data.map((country) => {
      const {
        name: { common },
        flags: { png },
        currencies,
      } = country;
      const currencyCodes = Object.keys(currencies);
      return { name: common, flags: png, currencies: currencyCodes };
    });
    // console.log(countries)
    countries.forEach((country, i) => {
      const selectOne = country.currencies[0] === "USD";
      const selectTwo = country.currencies[0] === "NGN";
      const optionOne = createOptionElement(
        country.currencies[0],
        country.currencies[0],
        selectOne
      );
      const optionTwo = createOptionElement(
        country.currencies[0],
        country.currencies[0],
        selectTwo
      );

      countrySelectionOne.appendChild(optionOne);
      countrySelectionTwo.appendChild(optionTwo);
    });
    countrySelectionOne.addEventListener("change", () => {
      const selectedCountryCode = countrySelectionOne.value;
      const selectedCountry = countries.find((country) => {
        return selectedCountryCode === country.currencies[0];
      });
      countryImageOne.src = selectedCountry.flags;
    });
    countrySelectionTwo.addEventListener("change", () => {
      const selectedCountryCode = countrySelectionTwo.value;
      const selectedCountry = countries.find((country) => {
        return selectedCountryCode === country.currencies[0];
      });
      countryImageTwo.src = selectedCountry.flags;
    });
    swapCurrencies(countries);
  } catch (error) {
    console.log(error);
  }
};

// Create an option element
const createOptionElement = (code, text, selected) => {
  const option = document.createElement("option");
  option.value = code;
  option.textContent = text;
  option.selected = selected;
  return option;
};
function swapCurrencies(countries) {
  swap.addEventListener("click", () => {
    let tempCode = countrySelectionOne.value;
    countrySelectionOne.value = countrySelectionTwo.value;
    countrySelectionTwo.value = tempCode;

    // Swap country images
    const selectedCountryOne = countries.find(
      (country) => country.currencies[0] === countrySelectionOne.value
    );
    const selectedCountryTwo = countries.find(
      (country) => country.currencies[0] === countrySelectionTwo.value
    );
    countryImageOne.src = selectedCountryOne.flags;
    countryImageTwo.src = selectedCountryTwo.flags;
    fetchCurrencies();
    calculate();
  });
}

//calculate the converted etc
const calculate = async () => {
  const amount_one = amount.value;
  if (amount_one === "" || amount_one === "0") {
    amount.value = "1";
    amount_one = 1;
  }
  let amount_two = amountTwo.textContent;
  const countryOne = countrySelectionOne.value;
  const countryTwo = countrySelectionTwo.value;

  try {
    const res = await fetch("https://open.exchangerate-api.com/v6/latest");
    const data = await res.json();
    const rate = data.rates[countryTwo] / data.rates[countryOne];
    console.log(data.rates);
    rateDom.textContent = `1 ${countryOne} = ${rate} ${countryTwo}`;
    amount_two = (amount_one * rate).toFixed(2);
    amountTwo.textContent = amount_two;
  } catch (error) {
    console.log(error);
  }
};

// Add event listener
window.addEventListener("DOMContentLoaded", fetchCurrencies);

button.addEventListener("click", (e) => {
  e.preventDefault();
  calculate();
});
