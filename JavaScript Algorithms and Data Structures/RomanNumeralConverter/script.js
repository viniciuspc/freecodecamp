const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const outputContainer = document.getElementById("output");

const convertTable = [
  {
    romanNumeral: "M",
    arabicNumeral: 1000
  },
  {
    romanNumeral: "CM",
    arabicNumeral: 900
  },
  {
    romanNumeral: "D",
    arabicNumeral: 500
  },
  {
    romanNumeral: "CD",
    arabicNumeral: 400
  },
  {
    romanNumeral: "C",
    arabicNumeral: 100
  },
  {
    romanNumeral: "XC",
    arabicNumeral: 90
  },
  {
    romanNumeral: "L",
    arabicNumeral: 50
  },
  {
    romanNumeral: "XL",
    arabicNumeral: 40
  },
  {
    romanNumeral: "X",
    arabicNumeral: 10
  },
  {
    romanNumeral: "IX",
    arabicNumeral: 9
  },
  {
    romanNumeral: "V",
    arabicNumeral: 5
  },
  {
    romanNumeral: "IV",
    arabicNumeral: 4
  },
  {
    romanNumeral: "I",
    arabicNumeral: 1
  },
];

const checkUserInput = () => {
  outputContainer.innerText = "";
  let inputInt = parseInt(numberInput.value);
  if(!numberInput.value || isNaN(inputInt)){
    outputContainer.textContent = "Please enter a valid number";
    outputContainer.classList.remove("hide")
    return;
  }

  if(inputInt < 1){
    outputContainer.textContent = "Please enter a number greater than or equal to 1";
    outputContainer.classList.remove("hide")
    return;
  }

  if(inputInt > 3999){
    outputContainer.textContent = "Please enter a number less than or equal to 3999";
    outputContainer.classList.remove("hide")
    return;
  }

  outputContainer.textContent = decimalToRoman(inputInt);
  outputContainer.classList.remove("hide")
  numberInput.value = "";
}

const decimalToRoman = (inputInt) => {
  let result = "";
  convertTable.forEach(({romanNumeral, arabicNumeral}) => {
    while(inputInt >= arabicNumeral){
      inputInt -= arabicNumeral;
      result += romanNumeral;
    }
  })
  return result;
  
}

convertButton.addEventListener("click", checkUserInput)

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});