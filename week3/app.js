const transactions = [
  {
    name: "Lunch",
    amount: 12.5,
    category: "🍔 Food",
    type: "expense",
    date: new Date(),
  },
];

const transactionCategory = [
  {
    name: "Food",
    icon: "🍔",
  },
  {
    name: "Transportation",
    icon: "🚗",
  },
];

const filter = {
  category: null,
  term: null,
};

const categoryLists = document.getElementById("category-lists");

function SummaryTransactions() {
  const incomSumElement = document.getElementById("income-sum");
  const expenseSumElement = document.getElementById("expense-sum");
  const balanceSumElement = document.getElementById("balance-sum");

  let incomeSum = 0;
  let expenseSum = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      incomeSum += transaction.amount;
    } else if (transaction.type === "expense") {
      expenseSum += transaction.amount;
    }
  });

  const balanceSum = incomeSum - expenseSum;

  incomSumElement.textContent = `${incomeSum.toFixed(2)} บาท`;
  expenseSumElement.textContent = `${expenseSum.toFixed(2)} บาท`;
  balanceSumElement.textContent = `${balanceSum.toFixed(2)} บาท`;
}

function displayCategory() {
  categoryLists.innerHTML = "";
  const items = transactionCategory.map((category) => {
    const option = document.createElement("option");
    option.value = `${category.icon} ${category.name}`;
    option.textContent = `${category.icon} ${category.name}`;
    return option.outerHTML;
  });
  console.log(items);

  categoryLists.innerHTML = items.join("");
}

displayCategory();

const categoryForm = document.getElementById("category-add-form");
categoryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("category-name");
  const icon = formData.get("category-icon");

  transactionCategory.push({ name, icon });
  displayCategory();
  e.target.reset();
});

function displayTransactions() {
  const transactionList = document.getElementById("transaction-lists");
  transactionList.innerHTML = "";

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter.category && transaction.category !== filter.category) return false;

    if (filter.term && !transaction.name.toLowerCase().includes(filter.term.toLowerCase()))
      return false;

    return true;
  });

  filteredTransactions.forEach((transaction) => {
    const listItem = document.createElement("li");
    const amountSpan = document.createElement("span");
    amountSpan.className = transaction.type === "income" ? "text-green-600" : "text-red-600";
    amountSpan.textContent = `฿${transaction.amount.toFixed(2)}`;
    listItem.innerHTML = `${transaction.name} - ${amountSpan.outerHTML} - ${transaction.category} - ${transaction.date.toLocaleDateString()}`;
    transactionList.appendChild(listItem);
  });
}

displayTransactions();

const transactionForm = document.getElementById("transaction-add-form");

transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("transaction-name");
  const amount = parseFloat(formData.get("transaction-amount"));
  const type = formData.get("transaction-type");
  const category = formData.get("transaction-category");
  const date = new Date();

  if (isNaN(amount)) {
    alert("Please enter a valid amount.");
    return;
  }

  transactions.push({ name, amount, category, date, type });
  displayTransactions();
  SummaryTransactions();
  e.target.reset();
});

const clearTransactionsButton = document.getElementById("clear-all");
clearTransactionsButton.addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to clear all transactions?");
  if (!confirmation) return;
  transactions.length = 0; // Clear the transactions array
  displayTransactions(); // Update the display
  SummaryTransactions();
});

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", () => {
  filter.term = searchBar.value;
  displayTransactions();
});

SummaryTransactions();
