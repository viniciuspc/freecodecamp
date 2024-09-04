let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const currencyToAmount = [
  0.01,
  0.05,
  0.1,
  0.25,
  1,
  5,
  10,
  20,
  100
]

const cashInput = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');

const fix = value => Number((value).toFixed(2))

const checkCash = () => {
  const cash = Number(cashInput.value)
  if(cash < price){
    alert("Customer does not have enough money to purchase the item")
  } else if(cash === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    changeDue.classList.remove("hide")
  } else {
    const changes = findLeastAmountOfChange(cash, price)
    if(changes.hasSufficientFunds){
      const cidHasNoCash = cid.every(currentValue => currentValue[1] === 0);
      let text = `Status: ${cidHasNoCash ? "CLOSED" : "OPEN"}`;
      for(let i = cid.length-1 ; i >= 0; i--){
        if(changes[cid[i][0]]){
          text += `\n${cid[i][0]}: $${changes[cid[i][0]].amount}`
        }
      }
      changeDue.innerText = text;
      changeDue.classList.remove("hide")
    } else {
      changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
      changeDue.classList.remove("hide")
    }
  }
}

const findLeastAmountOfChange = (cash, price) => {
  let change = fix(cash - price)
  let changes = {}
  // go to each value until found % that is enough
  for(let i = currencyToAmount.length-1 ; i >= 0; i--){
    const amount = currencyToAmount[i]
    while(change > 0 && cid[i][1] >= amount && cid[i][1] > 0 && fix(change % amount) < change){
      cid[i][1] = fix(cid[i][1] - amount) 

      if(changes[cid[i][0]]) {
        changes[cid[i][0]] = {
          amount: fix(changes[cid[i][0]].amount + amount)
        }
      } else {
        changes[cid[i][0]] = {
          amount: amount
        }
      }

      change = fix(change - amount)
    }
  }
  changes.hasSufficientFunds = !(change > 0)
  return changes;
}

purchaseBtn.addEventListener("click", checkCash)