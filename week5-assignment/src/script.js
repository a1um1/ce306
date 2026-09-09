let count = 0;

const clicker = document.getElementById("clicker");
const counter = document.getElementById("counter");

clicker.addEventListener("click", () => {
  count++;
  counter.textContent = count;
});

resetCounter = () => {
  count = 0;
  updateCounter();
};

updateCounter = () => {
  counter.textContent = count.toLocaleString("en-US");
};

resetCounter();

const toggleMode = document.getElementById("toggleMode");

toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
