import { v4 as uuidv4 } from "https://jspm.dev/uuid";

//MODEL BUDGET APP
let incomes = [];

//VIEW
const incomeList = document.querySelector("#income-list");
const incomeInput = document.querySelector("#income-name-input");
const amountIncomeInput = document.querySelector("#amount-income-input");
const incomeAddButton = document.querySelector("#income-add-button");
const incomeSumInfo = document.querySelector("#income-sum");

const expenseInput = document.querySelector("#expense-name-input");
const amountExpenseInput = document.querySelector("#amount-expense-input");
const expenseAddButton = document.querySelector("#expense-add-button");
const expenseSumInfo = document.querySelector("#expense-sum");

const createInputElement = (value, classIdName) => {
  const incomeItem = document.createElement("li");
  incomeItem.classList.add(classIdName);
  incomeItem.id = classIdName;
  incomeItem.textContent = value;
  return incomeItem;
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

const createAcceptChangeBtn = () => {
  const changeAcceptBtn = document.createElement("button");
  changeAcceptBtn.classList.add("change-accept-btn", "add-btn");
  changeAcceptBtn.textContent = "Zapisz";
  return changeAcceptBtn;
};

const createDeleteBtn = (id) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "add-btn");
  deleteBtn.id = `delete-btn-${id}`;
  deleteBtn.textContent = "Usuń";

  deleteBtn.addEventListener("click", () => {
    incomes = incomes.filter((item) => item.id !== id);
    renderIncomes();
    console.log(incomes);
    calculate(incomes);
  });
  return deleteBtn;
};

const createChangeBtn = (id) => {
  const changeBtn = document.createElement("button");
  changeBtn.classList.add("change-btn", "add-btn");
  changeBtn.id = "change-btn";
  changeBtn.textContent = "Zmień";

  //change nie działa
  changeBtn.addEventListener("click", () => {
    console.log(id);
    const elmList = document.querySelector(`#li-${id}`);
    const deleteElmBtn = document.querySelector(`#delete-btn-${id}`);
    elmList.classList.add("hidden");
    changeBtn.classList.add("hidden");
    deleteElmBtn.classList.add("hidden");
    const elementContainer = document.querySelector(`#container-${id}`);
    console.log(elementContainer);

    for (const item of incomes) {
      if (item.id === id) {
        const changeInputName = createChangeElement("input", "text", item.name);
        console.log(changeInputName);
        changeInputName.classList.add("change-input-name");
        const changeInputAmount = createChangeElement(
          "input",
          "number",
          item.value
        );

        elementContainer.appendChild(changeInputName);
        elementContainer.appendChild(changeInputAmount);

        const changeAcceptBtn = createAcceptChangeBtn();
        elementContainer.appendChild(changeAcceptBtn);

        //     newschema-v3.js:99 Uncaught TypeError: Cannot read properties of null (reading 'appendChild')
        // at HTMLButtonElement.<anonymous> (newschema-v3.js:99:26)

        changeAcceptBtn.addEventListener("click", function () {
          const newIncomeInputName = changeInputName.value;
          const newIncomeInputAmount = parseFloat(changeInputAmount.value);

          if (newIncomeInputName && !isNaN(newIncomeInputAmount)) {
            item.name = newIncomeInputName;
            item.value = newIncomeInputAmount;

            elementContainer.removeChild(changeInputName);
            elementContainer.removeChild(changeInputAmount);
            elementContainer.removeChild(changeAcceptBtn);
            elmList.classList.remove("hidden");
            changeBtn.classList.remove("hidden");
            deleteElmBtn.classList.remove("hidden");
          }
        });
      }
    }
    renderIncomes();
    calculate(incomes);
  });

  return changeBtn;
};

//UPDATE
//funkcja sumująca

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
const createListElement = (income) => {
  let fullItemName = `${income.name} - ${income.value.toFixed(2)} zł`;
  const li = createInputElement(fullItemName, `li-${income.id}`);
  const deleteBtn = createDeleteBtn(income.id);
  const changeBtn = createChangeBtn(income.id);

  const btnWrapper = createBtnWrapper(changeBtn, deleteBtn);
  const elementContainer = createTextBtnContainer(li, btnWrapper, income.id);
  incomeList.appendChild(elementContainer);
};

//funkcja renderująca input income
const renderIncomes = () => {
  incomeList.innerHTML = "";
  incomes.forEach((income) => {
    createListElement(income);
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
    renderIncomes();
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
