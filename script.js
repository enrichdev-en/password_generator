const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  numbers: getRandomNumber,
  symbols: getRandomSymbol,
};

clipboardEl.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }
  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Password copied to clipboard!");
});

generateEl.addEventListener("click", () => {
  const length = parseInt(lengthEl.value);
  const upperChecked = uppercaseEl.checked;
  const lowerChecked = lowercaseEl.checked;
  const numbersChecked = numbersEl.checked;
  const symbolsChecked = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    length,
    upperChecked,
    lowerChecked,
    numbersChecked,
    symbolsChecked
  );
});

function generatePassword(length, upper, lower, numbers, symbols) {
  let generatedPassword = "";
  const typesCount = upper + lower + numbers + symbols;
  const typesArr = [{ upper }, { lower }, { numbers }, { symbols }].filter(
    item => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const propName = Object.keys(type)[0];
      generatedPassword += randomFunc[propName]();
    });
  }
  const finalPassword = shufflePassword(generatedPassword);
  return finalPassword;
}

function shufflePassword(generatedPassword) {
  return generatedPassword
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
