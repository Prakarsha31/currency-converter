const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');

// Example static currency list (you can update it dynamically from an API)
const currencyList = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

currencyList.forEach(curr => {
  let option1 = document.createElement('option');
  option1.value = option1.text = curr;
  fromCurrency.appendChild(option1);

  let option2 = document.createElement('option');
  option2.value = option2.text = curr;
  toCurrency.appendChild(option2);
});

// Set default values
fromCurrency.value = 'USD';
toCurrency.value = 'INR';

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = amount.value;

  if (!amt || amt <= 0) {
    result.innerText = 'Please enter a valid amount.';
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const converted = (amt * rate).toFixed(2);
    result.innerText = `Converted Amount: ${converted} ${to}`;
  } catch (error) {
    result.innerText = 'Error fetching exchange rate.';
  }
}
