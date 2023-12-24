import { v4 as uuidv4 } from "https://jspm.dev/uuid";

//MODEL BUDGET APP
let incomes = [];
let expenses = [];

//VIEW
const incomeList = document.querySelector("#income-list");
const incomeInput = document.querySelector("#income-name-input");
const amountIncomeInput = document.querySelector("#amount-income-input");
const incomeAddButton = document.querySelector("#income-add-button");
const incomeSumInfo = document.querySelector("#income-sum");

const expenseList = document.querySelector("#expense-list");
const expenseInput = document.querySelector("#expense-name-input");
const amountExpenseInput = document.querySelector("#amount-expense-input");
const expenseAddButton = document.querySelector("#expense-add-button");
const expenseSumInfo = document.querySelector("#expense-sum");

const announcement = document.querySelector("#announcement");
const errorInfo = document.querySelector("#errors-info");
const monthInfo = document.querySelector(".month-info-btn");

const createInputElement = (value, classIdName) => {
  const inputItem = document.createElement("li");
  inputItem.classList.add(classIdName);
  inputItem.id = classIdName;
  inputItem.textContent = value;
  return inputItem;
};

const createBtnWrapper = (changeBtn, deleteBtn) => {
  const btnWrapper = document.createElement("div");
  btnWrapper.id = "btn-wrapper";
  btnWrapper.classList.add("btn-wrapper");
  btnWrapper.appendChild(changeBtn);
  btnWrapper.appendChild(deleteBtn);
  return btnWrapper;
};

const createTextBtnContainer = (item, btnWrapper, id) => {
  const inputBtnContainer = document.createElement("div");
  inputBtnContainer.id = `container-${id}`;
  inputBtnContainer.classList.add("input-btn-container");
  inputBtnContainer.appendChild(item);
  inputBtnContainer.appendChild(btnWrapper);
  return inputBtnContainer;
};

const createChangeElement = (elementName, typeName, inputName) => {
  const changeInputName = document.createElement(elementName);
  changeInputName.classList.add("input", "change-input");
  changeInputName.setAttribute("type", typeName);
  changeInputName.value = inputName;
  return changeInputName;
};

const createAcceptChangeBtn = (id) => {
  const changeAcceptBtn = document.createElement("button");
  changeAcceptBtn.classList.add("change-accept-btn", "add-btn");
  changeAcceptBtn.id = `change-accept-btn-${id}`;
  changeAcceptBtn.textContent = "Save";
  return changeAcceptBtn;
};

const createDeleteBtn = (id, array) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "add-btn");
  deleteBtn.id = `delete-btn-${id}`;
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    if (array === incomes) {
      incomes = incomes.filter((item) => item.id !== id);
      renderInputList(incomeList, incomes);
      calculate(incomes);
    } else if (array === expenses) {
      expenses = expenses.filter((item) => item.id !== id);
      renderInputList(expenseList, expenses);
      calculate(expenses);
    }
    bilans();
  });
  return deleteBtn;
};

const createChangeBtn = (id, list, array, name) => {
  const changeBtn = document.createElement("button");
  changeBtn.classList.add("change-btn", "add-btn");
  changeBtn.id = "change-btn";
  changeBtn.textContent = "Edit";
  changeBtn.addEventListener("click", () => {
    const elmList = document.querySelector(`#li-${id}`);
    const deleteElmBtn = document.querySelector(`#delete-btn-${id}`);
    elmList.classList.add("hidden");
    changeBtn.classList.add("hidden");
    deleteElmBtn.classList.add("hidden");
    const elementContainer = document.querySelector(`#container-${id}`);

    const elmToChange = array.find((elm) => elm.id === id);
    const changeInputName = createChangeElement(
      "input",
      "text",
      elmToChange.name
    );
    changeInputName.classList.add("change-input-name");
    const changeInputAmount = createChangeElement(
      "input",
      "number",
      elmToChange.value
    );
    const changeAcceptBtn = createAcceptChangeBtn(id);
    elementContainer.appendChild(changeInputName);
    elementContainer.appendChild(changeInputAmount);
    elementContainer.appendChild(changeAcceptBtn);

    changeAcceptBtn.addEventListener("click", function () {
      const newInputName = changeInputName.value;
      const newInputAmount = parseFloat(changeInputAmount.value);
      if (newInputName && !isNaN(newInputAmount)) {
        if (newInputAmount > 0) {
          elmToChange.name = newInputName;
          elmToChange.value = newInputAmount;
          elementContainer.removeChild(changeInputName);
          elementContainer.removeChild(changeInputAmount);
          elementContainer.removeChild(changeAcceptBtn);
          renderInputList(list, array);
          calculate(array);
          bilans();
        } else {
          alert("The amount must be greater than 0");
        }
      } else {
        alert(`Enter the name and amount ${name}`);
      }
    });
  });
  return changeBtn;
};

const hidePartList = (list, array, listName) => {
  if (array.length > 5) {
    for (let i = 5; i < array.length; i++) {
      const idItem = array[i].id;
      const elementContainer = document.querySelector(`#container-${idItem}`);
      elementContainer.classList.add("hidden");
    }
    if (!list.querySelector("#see-more-btn")) {
      const seeMoreElm = document.createElement("button");
      seeMoreElm.classList.add("see-more-btn");
      seeMoreElm.id = `see-more-btn-${listName}`;
      seeMoreElm.setAttribute("type", "button");
      seeMoreElm.textContent = "Show more";
      list.appendChild(seeMoreElm);
      seeMoreElm.addEventListener("click", () => {
        for (let i = 5; i < array.length; i++) {
          const idItem = array[i].id;
          const elementContainer = document.querySelector(
            `#container-${idItem}`
          );
          elementContainer.classList.toggle("hidden");
          if (seeMoreElm.textContent === "Show more") {
            seeMoreElm.textContent = "Show less";
          } else if (seeMoreElm.textContent === "Show less") {
            seeMoreElm.textContent = "Show more";
          }
        }
      });
    }
  }
};

//UPDATE
const calculate = (array) => {
  const numberArray = array.map((item) => {
    return item.value;
  });
  const sumInput = numberArray.reduce((acc, number) => {
    return acc + number;
  }, 0);
  if (array === incomes) {
    incomeSumInfo.textContent = `${sumInput.toFixed(2)} EUR`;
  } else if (array === expenses) {
    expenseSumInfo.textContent = `${sumInput.toFixed(2)} EUR`;
  }
  return sumInput;
};

const bilans = () => {
  const incomesSum = calculate(incomes);
  const expensesSum = calculate(expenses);
  const result = parseFloat(incomesSum - expensesSum).toFixed(2);
  if (incomesSum > expensesSum) {
    announcement.textContent = `You can still spend ${result} EUR`;
  } else if (incomesSum < expensesSum) {
    announcement.textContent = `The balance is negative. You are at a deficit of ${result} EUR`;
  } else {
    announcement.textContent = "The balance is O";
  }
  errorInfo.textContent = "";
};

const createListElement = (item, list, array, name) => {
  const fullItemName = `${item.name} - ${item.value.toFixed(2)} EUR`;
  const li = createInputElement(fullItemName, `li-${item.id}`);
  const deleteBtn = createDeleteBtn(item.id, array);
  const changeBtn = createChangeBtn(item.id, list, array, name);

  const btnWrapper = createBtnWrapper(changeBtn, deleteBtn);
  const elementContainer = createTextBtnContainer(li, btnWrapper, item.id);
  if (array === incomes) {
    incomeList.appendChild(elementContainer);
  } else if (array === expenses) {
    expenseList.appendChild(elementContainer);
  }
};

const renderInputList = (list, array, name, listName) => {
  list.innerHTML = "";
  array.forEach((item) => {
    createListElement(item, list, array, name);
  });
  hidePartList(list, array, listName);
};

const addIncome = () => {
  const incomeInputName = incomeInput.value;
  const incomeInputAmount = parseFloat(amountIncomeInput.value);
  if (incomeInputName && !isNaN(incomeInputAmount)) {
    if (incomeInputAmount > 0) {
      incomes.push({
        name: incomeInputName,
        value: incomeInputAmount,
        id: uuidv4(),
      });
      renderInputList(incomeList, incomes, "income", "incomeList");
      calculate(incomes);
      bilans();
    } else {
      errorInfo.textContent = "The amount must be greater than 0";
    }
  } else {
    errorInfo.textContent = "Enter the name and amount of an income";
  }

  incomeInput.value = "";
  amountIncomeInput.value = "";
};

const addExpense = () => {
  const expenseInputName = expenseInput.value;
  const expenseInputAmount = parseFloat(amountExpenseInput.value);
  if (expenseInputName && !isNaN(expenseInputAmount)) {
    if (expenseInputAmount > 0) {
      expenses.push({
        name: expenseInputName,
        value: expenseInputAmount,
        id: uuidv4(),
      });
      renderInputList(expenseList, expenses, "expense", "expenseList");
      calculate(expenses);
      bilans();
    } else {
      errorInfo.textContent = "The amount must be greater than 0";
    }
  } else {
    errorInfo.textContent = "Enter the name and amount of an expense";
  }
  expenseInput.value = "";
  amountExpenseInput.value = "";
};

const monthName = () => {
  const monthName = prompt("Enter the month and year of incomes and expenses");
  if (monthName !== "" && monthName !== null) {
    monthInfo.textContent = monthName;
  } else {
    monthInfo.textContent = "Current month";
  }
};

//EVENTY/START APP
document.addEventListener("DOMContentLoaded", function () {
  monthName();

  incomeAddButton.addEventListener("click", function () {
    addIncome();
  });
  expenseAddButton.addEventListener("click", function () {
    addExpense();
  });

  monthInfo.addEventListener("click", function () {
    monthName();
  });
});
