import { v4 as uuidv4 } from "https://jspm.dev/uuid";

//MODEL BUDGET APP
let incomes = [];

let expense = [];

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

//universal
const createInputElement = (value, classIdName) => {
  const inputItem = document.createElement("li");
  inputItem.classList.add(classIdName);
  inputItem.id = classIdName;
  inputItem.textContent = value;
  return inputItem;
};
//universal
const createBtnWrapper = (changeBtn, deleteBtn) => {
  const btnWrapper = document.createElement("div");
  btnWrapper.id = "btn-wrapper";
  btnWrapper.classList.add("btn-wrapper");
  btnWrapper.appendChild(changeBtn);
  btnWrapper.appendChild(deleteBtn);
  return btnWrapper;
};
//universal
const createTextBtnContainer = (item, btnWrapper, id) => {
  const inputBtnContainer = document.createElement("div");
  inputBtnContainer.id = `container-${id}`;
  inputBtnContainer.classList.add("input-btn-container");
  inputBtnContainer.appendChild(item);
  inputBtnContainer.appendChild(btnWrapper);
  return inputBtnContainer;
};

//universal
const createChangeElement = (elementName, typeName, inputName) => {
  const changeInputName = document.createElement(elementName);
  changeInputName.classList.add("input", "change-input");
  changeInputName.setAttribute("type", typeName);
  changeInputName.value = inputName;
  return changeInputName;
};

//universal
const createAcceptChangeBtn = () => {
  const changeAcceptBtn = document.createElement("button");
  changeAcceptBtn.classList.add("change-accept-btn", "add-btn");
  changeAcceptBtn.textContent = "Zapisz";
  return changeAcceptBtn;
};
//not universal - renderIncomes/calculate
// TODO make universal
const createDeleteBtn = (id) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "add-btn");
  deleteBtn.id = `delete-btn-${id}`;
  deleteBtn.textContent = "Usuń";

  deleteBtn.addEventListener("click", () => {
    incomes = incomes.filter((item) => item.id !== id);
    renderIncomes(incomeList, incomes);
    calculate(incomes);
  });
  return deleteBtn;
};
//not universal - renderIncomes/calculate
// TODO make universal
const createChangeBtn = (id) => {
  const changeBtn = document.createElement("button");
  changeBtn.classList.add("change-btn", "add-btn");
  changeBtn.id = "change-btn";
  changeBtn.textContent = "Zmień";

  changeBtn.addEventListener("click", () => {
    const elmList = document.querySelector(`#li-${id}`);
    const deleteElmBtn = document.querySelector(`#delete-btn-${id}`);
    elmList.classList.add("hidden");
    changeBtn.classList.add("hidden");
    deleteElmBtn.classList.add("hidden");
    const elementContainer = document.querySelector(`#container-${id}`);

    const incomeToChange = incomes.find((elm) => elm.id === id);
    const changeInputName = createChangeElement(
      "input",
      "text",
      incomeToChange.name
    );
    changeInputName.classList.add("change-input-name");
    const changeInputAmount = createChangeElement(
      "input",
      "number",
      incomeToChange.value
    );
    const changeAcceptBtn = createAcceptChangeBtn();
    elementContainer.appendChild(changeInputName);
    elementContainer.appendChild(changeInputAmount);
    elementContainer.appendChild(changeAcceptBtn);

    changeAcceptBtn.addEventListener("click", function () {
      const newIncomeInputName = changeInputName.value;
      const newIncomeInputAmount = parseFloat(changeInputAmount.value);
      if (newIncomeInputName && !isNaN(newIncomeInputAmount)) {
        incomeToChange.name = newIncomeInputName;
        incomeToChange.value = newIncomeInputAmount;
        elementContainer.removeChild(changeInputName);
        elementContainer.removeChild(changeInputAmount);
        elementContainer.removeChild(changeAcceptBtn);
        renderIncomes(incomeList, incomes);
        calculate(incomes);
      }
    });
  });
  return changeBtn;
};

//UPDATE
//funkcja sumująca
//universal
const calculate = (array) => {
  const numberArray = array.map((item) => {
    return item.value;
  });

  const sumIncome = numberArray.reduce((acc, number) => {
    return acc + number;
  }, 0);
  incomeSumInfo.textContent = `${sumIncome.toFixed(2)} zł`;
};

//funkcja tworząca element na liście:
//universal
const createListElement = (item) => {
  let fullItemName = `${item.name} - ${item.value.toFixed(2)} zł`;
  const li = createInputElement(fullItemName, `li-${item.id}`);
  const deleteBtn = createDeleteBtn(item.id);
  const changeBtn = createChangeBtn(item.id);

  const btnWrapper = createBtnWrapper(changeBtn, deleteBtn);
  const elementContainer = createTextBtnContainer(li, btnWrapper, item.id);
  incomeList.appendChild(elementContainer);
};

//funkcja renderująca input income
//universal
const renderIncomes = (list, array) => {
  list.innerHTML = "";
  array.forEach((item) => {
    createListElement(item);
  });
};

//funckja umozliwiająca dodawania do listy income
const addIncome = () => {
  let incomeInputName = incomeInput.value;
  let incomeInputAmount = amountIncomeInput.value;
  incomeInputAmount = parseFloat(incomeInputAmount);

  if (incomeInputName && !isNaN(incomeInputAmount)) {
    incomes.push({
      name: incomeInputName,
      value: incomeInputAmount,
      id: uuidv4(),
    });
    renderIncomes(incomeList, incomes);
    calculate(incomes);
  }
  incomeInput.value = "";
  amountIncomeInput.value = "";
};

//funckja umozliwiająca dodawania do listy expense

//funckja startująca dla aplikacji
const renderApp = () => {
  addIncome();
};

//EVENTY
//START APP
document.addEventListener("DOMContentLoaded", function () {
  incomeAddButton.addEventListener("click", function () {
    renderApp();
  });
});
