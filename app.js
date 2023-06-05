let balance = document.getElementById("balance");
let money_plus = document.getElementById("money-plus");
let money_minus = document.getElementById("money-minus");
let list = document.getElementById("list");
let form = document.getElementById("form");
let text = document.getElementById("text");
let amount = document.getElementById("amount");


let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


function addTransaction(e) {
    e.preventDefault();
    if (
        text.value.trim() === '' || amount.value.trim() === ''
    ) {
        alert("please Enter text and amount");
    } else {
        let transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

function generateID() {
    return Math.floor(Math.random() * 100000000);

}



function addTransactionDOM(transaction) {
    let sign = transaction.amount < 0 ? "-" : "+";
    let item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(
        transaction.amount
    )}</span>
    <button class = "delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

function updateValues() {
    let amounts = transactions.map((transaction) => transaction.amount);
    let total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    let income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    let expense = (
        amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}

function updateLocalStorage() {
    localStorage.setItem('transaction', JSON.stringify(transactions));
}



function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();

form.addEventListener('submit', addTransaction);