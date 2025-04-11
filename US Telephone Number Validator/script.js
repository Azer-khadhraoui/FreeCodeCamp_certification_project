
const input = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultDiv = document.getElementById('results-div');

function isValidUSPhoneNumber(phone) {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;
  return regex.test(phone);
}

checkBtn.addEventListener('click', () => {
  const number = input.value.trim();

  if (number === '') {
    alert('Please provide a phone number');
    return;
  }

  if (isValidUSPhoneNumber(number)) {
    resultDiv.textContent = `Valid US number: ${number}`;
  } else {
    resultDiv.textContent = `Invalid US number: ${number}`;
  }
});

clearBtn.addEventListener('click', () => {
  resultDiv.textContent = '';
  input.value = '';
});
