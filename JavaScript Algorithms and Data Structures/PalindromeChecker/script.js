const inputText = document.getElementById("text-input")
const checkButton = document.getElementById("check-btn")
const result = document.getElementById("result")
const check = () => {
  const textValue = inputText.value
  if(textValue === ""){
    alert("Please input a value")
    return
  }
  
  const cleanedText = cleanInput(textValue);
  console.log(cleanedText)
  console.log(reverse(cleanedText))

  if(cleanedText === reverse(cleanedText)){
    result.innerText = `${textValue} is a palindrome`
  } else {
    result.innerText = `${textValue} is not a palindrome`
  }
  result.classList.remove("hide")
}

// This method will put the text in lower case and remove everithing that is not a letter or a number
const cleanInput = (text) => {
  const pattern = /[^0-9a-z]/g;
  return text.toLowerCase().replace(pattern, '')
}

// This will reverse a text.
const reverse = (text) => {
  const reverse = [];
  for(let i = text.length - 1; i >= 0; i--){
    reverse.push(text[i])
  }
  return reverse.join("");
}

checkButton.addEventListener("click", check)