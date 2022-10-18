// Input Elements
const billAmount = document.getElementById("bill-amount");
const personsNumber = document.getElementById("person-input");
const customTip = document.getElementById("tip-amount");
const tipAmounts = document.querySelectorAll(".tip-ratio button");
// Output Elements
const errorMessage = document.querySelectorAll(".error-message");
const results = document.querySelectorAll("h1");
const resetBtn = document.getElementById("reset-btn");
// Error Message
const lessThanZero = "Can't be zero or less";

// Stores built-in tip value identified as their indexes
const tipValues = {
  0: 0.05,
  1: 0.1,
  2: 0.15,
  3: 0.25,
  4: 0.5,
};

// Tracks built-in amount values
for (let i = 0; i < tipAmounts.length; i++) {
  tipAmounts[i].addEventListener("click", function () {
    customTip.value = "";
    tipAmounts[i].classList.toggle("selected");
    for (let j = 0; j < tipAmounts.length && j != i; j++) {
      if (tipAmounts[j].classList.contains("selected")) {
        tipAmounts[j].classList.remove("selected");
      }
    }
    for (let k = tipAmounts.length - 1; k > 0 && k != i; k--) {
      if (tipAmounts[k].classList.contains("selected")) {
        tipAmounts[k].classList.remove("selected");
      }
    }
    if (selectedTipAmount()) {
      calculateTip(
        billAmount.value,
        personsNumber.value,
        tipValues[`${selectedTipAmount() - 1}`]
      );
    }
  });
}

// tracks user inputs and keep value updated
billAmount.addEventListener("keyup", () => {
  if (billAmount.value && personsNumber.value) {
    isInputValid();
  }
  if (selectedTipAmount()) {
    calculateTip(
      billAmount.value,
      personsNumber.value,
      tipValues[`${selectedTipAmount() - 1}`]
    );
  } else {
    calculateTip(
      billAmount.value,
      personsNumber.value,
      parseFloat(customTip.value) / 100
    );
  }
});
personsNumber.addEventListener("keyup", () => {
  if (billAmount.value && personsNumber.value) {
    isInputValid();
  }
  if (selectedTipAmount()) {
    calculateTip(
      billAmount.value,
      personsNumber.value,
      tipValues[`${selectedTipAmount() - 1}`]
    );
  } else {
    calculateTip(
      billAmount.value,
      personsNumber.value,
      parseFloat(customTip.value) / 100
    );
  }
});
// Take custom input from the user
customTip.addEventListener("keyup", () => {
  removeSelected();
  calculateTip(
    billAmount.value,
    personsNumber.value,
    parseFloat(customTip.value) / 100
  );
});
// Reset button functionality
resetBtn.addEventListener("click", () => {
  billAmount.value = "";
  personsNumber.value = "";
  customTip.value = "";
  removeSelected();
  results[0].textContent = `$0.0`;
  results[1].textContent = `$0.0`;
});

// This function de-select tip amount buttons
function removeSelected() {
  for (let i = 0; i < tipAmounts.length; i++) {
    if (tipAmounts[i].classList.contains("selected")) {
      tipAmounts[i].classList.remove("selected");
    }
  }
}
// Checks the chose of tip amount (takes the first occurance)
function selectedTipAmount() {
  for (let i = 0; i < tipAmounts.length; i++) {
    if (tipAmounts[i].classList.contains("selected")) {
      return i + 1;
    }
  }
  return 0;
}
// Checks if the inputs in Bill and people are valid
function isInputValid() {
  if (billAmount.value < 1) {
    errorMessage[0].textContent = lessThanZero;
    billAmount.classList.add("error");
  } else {
    errorMessage[0].textContent = "";
    billAmount.classList.remove("error");
  }
  if (personsNumber.value < 1) {
    personsNumber.classList.add("error");
    errorMessage[2].textContent = lessThanZero;
  } else {
    errorMessage[2].textContent = "";
    personsNumber.classList.remove("error");
  }
}
// Calculate  tip and display it
function calculateTip(value1, value2, tip) {
  let personTip = (parseFloat(value1) * parseFloat(tip)) / parseInt(value2);
  let total = parseFloat(value1) / parseInt(value2) + personTip;
  if (!isNaN(total)) {
    if (total != Infinity) {
      results[0].textContent = `$${personTip.toFixed(2)}`;
      results[1].textContent = `$${total.toFixed(2)}`;
    } else {
      results[0].textContent = `$0.0`;
      results[1].textContent = `$0.0`;
    }
  }
}
