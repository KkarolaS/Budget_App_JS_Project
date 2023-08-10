//MODEL BUDGET APP
let totalAmount = 0;

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

const createChangeBtn = () => {
  const changeBtn = document.createElement("button");
  changeBtn.classList.add("change-btn", "add-btn");
  changeBtn.id = "change-btn";
  changeBtn.textContent = "Zmień";
  return changeBtn;
};

const createDeleteBtn = () => {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "add-btn");
  deleteBtn.id = "delete-btn";
  deleteBtn.textContent = "Usuń";
  return deleteBtn;
};

const createBtnWrapper = (changeBtn, deleteBtn) => {
  const btnWrapper = document.createElement("div");
  btnWrapper.id = "btn-wrapper";
  btnWrapper.classList.add("btn-wrapper");
  btnWrapper.appendChild(changeBtn);
  btnWrapper.appendChild(deleteBtn);
  return btnWrapper;
};

//tworzy container dla inputu <li> i wrapper dla przycisku change i delete
const createTextBtnContainer = (item, btnWrapper) => {
  const inputBtnContainer = document.createElement("div");
  inputBtnContainer.id = "input-btn-container";
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

//UPDATE
//funckja umozliwiająca dodawania do listy income
const createIncomeList = () => {
  let incomeInputName = incomeInput.value;
  let incomeInputAmount = amountIncomeInput.value;
  incomeInputAmount = parseFloat(incomeInputAmount);

  if (incomeInputName && !isNaN(incomeInputAmount)) {
    let fullItemName = `${incomeInputName} - ${incomeInputAmount.toFixed(
      2
    )} zł`;

    const li = createInputElement(fullItemName, "income-item");
    const changeBtn = createChangeBtn();
    const deleteBtn = createDeleteBtn();
    const btnWrapper = createBtnWrapper(changeBtn, deleteBtn);
    const elementContainer = createTextBtnContainer(li, btnWrapper);
    incomeList.appendChild(elementContainer);

    totalAmount += incomeInputAmount;
    incomeSumInfo.textContent = `${totalAmount.toFixed(2)} zł`;

    changeBtn.addEventListener("click", function () {
      li.classList.add("hidden");
      changeBtn.classList.add("hidden");
      deleteBtn.classList.add("hidden");

      const changeInputName = createChangeElement(
        "input",
        "text",
        incomeInputName
      );
      changeInputName.classList.add("change-input-name");
      elementContainer.appendChild(changeInputName);
      const changeInputAmount = createChangeElement(
        "input",
        "number",
        incomeInputAmount
      );
      elementContainer.appendChild(changeInputAmount);
      const changeAcceptBtn = createAcceptChangeBtn();
      elementContainer.appendChild(changeAcceptBtn);

      changeAcceptBtn.addEventListener("click", function () {
        const newIncomeInputName = changeInputName.value;
        let newIncomeInputAmount = parseFloat(changeInputAmount.value);

        if (newIncomeInputName && !isNaN(newIncomeInputAmount)) {
          newIncomeInputAmount = newIncomeInputAmount;
          totalAmount -= incomeInputAmount;
          totalAmount += newIncomeInputAmount;
          incomeSumInfo.textContent = `${totalAmount.toFixed(2)} zł`;

          const newFullItemName = `${newIncomeInputName} - ${newIncomeInputAmount} zł`;
          li.textContent = newFullItemName;
          incomeInputAmount = newIncomeInputAmount;

          elementContainer.removeChild(changeInputName);
          elementContainer.removeChild(changeInputAmount);
          elementContainer.removeChild(changeAcceptBtn);
          li.classList.remove("hidden");
          changeBtn.classList.remove("hidden");
          deleteBtn.classList.remove("hidden");
        }
      });
    });

    deleteBtn.addEventListener("click", function () {
      totalAmount -= incomeInputAmount;
      incomeSumInfo.textContent = `${totalAmount.toFixed(2)} zł`;
      incomeList.removeChild(elementContainer);
    });

    incomeInput.value = "";
    amountIncomeInput.value = "";
  }
};
//funckja umozliwiająca dodawania do listy expense

//funckja startująca dla aplikacji
const renderApp = () => {
  createIncomeList();
};

//EVENTY
//START APP
document.addEventListener("DOMContentLoaded", function () {
  incomeAddButton.addEventListener("click", function () {
    renderApp();
  });
});
