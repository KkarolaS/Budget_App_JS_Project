// input default value show and hide
const inputValueDelete = (element) => {
  element.value = "";
};

const inputShowHide = () => {
  const inputList = document.querySelectorAll(".input");
  for (const element of inputList) {
    element.addEventListener("click", function () {
      inputValueDelete(element);
    });
  }

  const incomeInput = document.querySelector("#income-name-input");
  const expanseInput = document.querySelector("#expense-name-input");
  const amountIncomeInput = document.querySelectorAll("#amount-income-input");
  const amountExpenseInput = document.querySelectorAll("#amount-expense-input");

  document.body.addEventListener("click", function (event) {
    const inputId = event.target.getAttribute("id");
    if (inputId !== "income-name-input") {
      if (incomeInput.value === "") {
        incomeInput.value = "Nazwa przychodu";
      }
    }
    if (inputId !== "expense-name-input") {
      if (expanseInput.value === "") {
        expanseInput.value = "Nazwa wydatku";
      }
    }
    if (inputId !== "amount-income-input") {
      for (const input of amountIncomeInput) {
        if (input.value === "") {
          input.value = "Kwota";
        }
      }
    }
    if (inputId !== "amount-expense-input") {
      for (const input of amountExpenseInput) {
        if (input.value === "") {
          input.value = "Kwota";
        }
      }
    }
  });

  const incomeAddButton = document.querySelector("#income-add-button");
  incomeAddButton.addEventListener("click", function () {
    incomeInput.value = "Nazwa przychodu";
    for (const input of amountIncomeInput) {
      input.value = "Kwota";
    }
  });

  const expanseAddButton = document.querySelector("#expense-add-button");
  expanseAddButton.addEventListener("click", function () {
    expanseInput.value = "Nazwa wydatku";
    for (const input of amountExpenseInput) {
      input.value = "Kwota";
    }
  });
};

// create list with inputs and add icome and expanse inputs to list

const createIncomeList = () => {
  const incomeList = document.querySelector("#income-list");
  incomeList = [];

  //muszę mieć tablicę obiektów -coś nie tak z tablicą

  // muszę złapać input.target.value przychodu + kwoty i t
  // dodawać do tablicy i dodawac kazdy stworzony element
  const incomeItem = document.createElement("li");
  incomeItem.classList.add("icome-item");
  incomeItem.id = "icome-item";
  incomeItem.innerText = "przychód1";
  incomeList.appendChild(incomeItem);
};

document.addEventListener("DOMContentLoaded", function () {
  inputShowHide();
  createIncomeList();
});
