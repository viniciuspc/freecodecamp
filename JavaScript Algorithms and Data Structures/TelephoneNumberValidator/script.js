const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const checkTelephoneNumber = (input) => {
  const regex = /^[1]?\s?(?:\([0-9]{3}\)|[0-9]{3})\s?-?[0-9]{3}\s?-?[0-9]{4}$/g
  return regex.test(input);
}

const validateTelephoneNumber = () => {
  const value = userInput.value;
  if(value === ""){
    alert("Please provide a phone number");
    return
  }

  resultsDiv.innerText = checkTelephoneNumber(value) ? `Valid US number: ${value}` : `Invalid US number: ${value}`
  resultsDiv.classList.remove("hide")
}

const clearResults = () => {
  resultsDiv.innerText = "";
  resultsDiv.classList.add("hide")
}

checkBtn.addEventListener("click", validateTelephoneNumber)
clearBtn.addEventListener("click", clearResults)