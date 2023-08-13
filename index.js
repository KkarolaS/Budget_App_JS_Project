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
const createAcceptChangeBtn = (id) => {
  const changeAcceptBtn = document.createElement("button");
  changeAcceptBtn.classList.add("change-accept-btn", "add-btn");
  changeAcceptBtn.id = `change-accept-btn-${id}`;
  changeAcceptBtn.textContent = "Zapisz";
  return changeAcceptBtn;
};
// universal
const createDeleteBtn = (id, array) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "add-btn");
  deleteBtn.id = `delete-btn-${id}`;
  deleteBtn.textContent = "Usuń";

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
//universal
const createChangeBtn = (id, list, array) => {
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
        elmToChange.name = newInputName;
        elmToChange.value = newInputAmount;
        elementContainer.removeChild(changeInputName);
        elementContainer.removeChild(changeInputAmount);
        elementContainer.removeChild(changeAcceptBtn);
        renderInputList(list, array);
        calculate(array);
        bilans();
      }
    });
  });
  return changeBtn;
};

//dots
const hidePartList = (list, array) => {
  if (array.length > 2) {
    for (let i = 2; i < array.length; i++) {
      const idItem = array[i].id;
      const elementContainer = document.querySelector(`#container-${idItem}`);
      elementContainer.classList.add("hidden");
    }
    // const container = document.querySelector(id);
    if (!list.querySelector("#dots-img")) {
      const seeMoreElm = document.createElement("button");
      seeMoreElm.classList.add("dots-img");
      seeMoreElm.id = "dots-img";
      seeMoreElm.setAttribute("type", "button");
      list.appendChild(seeMoreElm);

      seeMoreElm.addEventListener("click", () => {
        for (let i = 2; i < array.length; i++) {
          const idItem = array[i].id;
          const elementContainer = document.querySelector(
            `#container-${idItem}`
          );
          elementContainer.classList.toggle("hidden");
        }
      });
    }
  }
};

//UPDATE
//funkcja sumująca
//universal
const calculate = (array) => {
  const numberArray = array.map((item) => {
    return item.value;
  });

  const sumInput = numberArray.reduce((acc, number) => {
    return acc + number;
  }, 0);

  if (array === incomes) {
    incomeSumInfo.textContent = `${sumInput.toFixed(2)} zł`;
  } else if (array === expenses) {
    expenseSumInfo.textContent = `${sumInput.toFixed(2)} zł`;
  }
  return sumInput;
};

const bilans = () => {
  const incomesSum = calculate(incomes);
  const expensesSum = calculate(expenses);
  const result = parseFloat(incomesSum - expensesSum).toFixed(2);
  if (incomesSum > expensesSum) {
    announcement.textContent = `Możesz jeszcze wydać ${result} złotych`;
  } else if (incomesSum < expensesSum) {
    announcement.textContent = `Bilans jest ujemny. Jesteś na minusie ${result} złotych`;
  } else {
    announcement.textContent = "Bilans wynosi 0";
  }
};

//funkcja tworząca element na liście:
//universal
const createListElement = (item, list, array) => {
  let fullItemName = `${item.name} - ${item.value.toFixed(2)} zł`;
  const li = createInputElement(fullItemName, `li-${item.id}`);
  const deleteBtn = createDeleteBtn(item.id, array);
  const changeBtn = createChangeBtn(item.id, list, array);

  const btnWrapper = createBtnWrapper(changeBtn, deleteBtn);
  const elementContainer = createTextBtnContainer(li, btnWrapper, item.id);
  if (array === incomes) {
    incomeList.appendChild(elementContainer);
  } else if (array === expenses) {
    expenseList.appendChild(elementContainer);
  }
};

//universal
const renderInputList = (list, array, name) => {
  list.innerHTML = "";
  array.forEach((item) => {
    createListElement(item, list, array);
  });
  hidePartList(list, array);
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
    renderInputList(incomeList, incomes, `income`);
    calculate(incomes);
    bilans();
    // hidePartList(incomes, "#income-list-container");
  }
  incomeInput.value = "";
  amountIncomeInput.value = "";
};

//funckja umozliwiająca dodawania do listy expense
const addExpense = () => {
  let expenseInputName = expenseInput.value;
  let expenseInputAmount = amountExpenseInput.value;
  expenseInputAmount = parseFloat(expenseInputAmount);

  if (expenseInputName && !isNaN(expenseInputAmount)) {
    expenses.push({
      name: expenseInputName,
      value: expenseInputAmount,
      id: uuidv4(),
    });
    renderInputList(expenseList, expenses, `expense`);
    calculate(expenses);
    bilans();
    // hidePartList(expenses, "#expense-list-container");
  }
  expenseInput.value = "";
  amountExpenseInput.value = "";
};

//EVENTY/START APP
document.addEventListener("DOMContentLoaded", function () {
  incomeAddButton.addEventListener("click", function () {
    addIncome();
  });
  expenseAddButton.addEventListener("click", function () {
    addExpense();
  });
});
