//MODEL BUDGET APP
//dane naszej aplikacji

let totalAmount = 0;

//VIEW
//funckje renderujące View (tworzące DOM)

// conainers do działania na html
const incomeInput = document.querySelector("#income-name-input");
const amountIncomeInput = document.querySelector("#amount-income-input");
const incomeAddButton = document.querySelector("#income-add-button");
const incomeSumInfo = document.querySelector("#income-sum");

const expenseInput = document.querySelector("#expense-name-input");
const amountExpenseInput = document.querySelector("#amount-expense-input");
const expenseAddButton = document.querySelector("#expense-add-button");
const expenseSumInfo = document.querySelector("#expense-sum");

//elementy html do tworzenia

// tworzenie pozycji <li> na liscie <ul>
const createInputElement = (value, classIdName) => {
  const incomeItem = document.createElement("li");
  incomeItem.classList.add(classIdName);
  incomeItem.id = classIdName;
  incomeItem.textContent = value;
  return incomeItem;
};

//tworzy przycik change btn
const createChangeBtn = () => {
  const changeBtn = document.createElement("button");
  changeBtn.classList.add("change-btn", "add-btn");
  changeBtn.id = "change-btn";
  changeBtn.textContent = "Zmień";
  return changeBtn;
};

//tworzy przycik delete btn
const createDeleteBtn = () => {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "add-btn");
  deleteBtn.id = "delete-btn";
  deleteBtn.textContent = "Usuń";
  return deleteBtn;
};

// tworzy wrapper dla przycisków change i delete
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

//UPDATE
//funkcje zmieniające MODEL

// funckja podliczająca sumę

//funckja umoliwiająca dodawania do listy
const createIncomeList = () => {
  incomeAddButton.addEventListener("click", function () {
    let incomeInputName = incomeInput.value;
    let incomeInputAmount = amountIncomeInput.value;
    incomeInputAmount = parseFloat(incomeInputAmount);

    if (incomeInputName && !isNaN(incomeInputAmount)) {
      const incomeList = document.querySelector("#income-list");

      let fullItemName = `${incomeInputName} - ${incomeInputAmount.toFixed(
        2
      )} zł`;

      const li = createInputElement(fullItemName, "income-item");
      // elementContainer.appendChild(li);

      const changeBtn = createChangeBtn();
      // btnWrapper.appendChild(changeBtn);
      const deleteBtn = createDeleteBtn();
      // btnWrapper.appendChild(deleteBtn);
      const btnWrapper = createBtnWrapper(changeBtn, deleteBtn);
      // elementContainer.appendChild(btnWrapper);

      const elementContainer = createTextBtnContainer(li, btnWrapper);
      incomeList.appendChild(elementContainer);

      totalAmount += incomeInputAmount;
      incomeSumInfo.textContent = `${totalAmount.toFixed(2)} zł`;

      changeBtn.addEventListener("click", function () {
        const changeInputName = document.createElement("input");
        // changeInputName.id = "change-input";
        changeInputName.classList.add(
          "input",
          "change-input",
          "change-input-name"
        );
        changeInputName.setAttribute("type", "text");
        changeInputName.value = incomeInputName;
        elementContainer.appendChild(changeInputName);

        const changeInputAmount = document.createElement("input");
        changeInputAmount.classList.add("input", "change-input");
        changeInputAmount.setAttribute("type", "number");
        changeInputAmount.value = incomeInputAmount;
        elementContainer.appendChild(changeInputAmount);

        li.classList.add("hidden");
        changeBtn.classList.add("hidden");
        deleteBtn.classList.add("hidden");

        const changeAcceptBtn = document.createElement("button");
        // changeAcceptBtn.id = "change-accept-btn";
        changeAcceptBtn.classList.add("change-accept-btn", "add-btn");
        changeAcceptBtn.textContent = "Zapisz";
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
  });
};

//funckja startująca dla aplikacji
const renderApp = () => {
  createIncomeList();
};

//EVENTY
//START APP
document.addEventListener("DOMContentLoaded", function () {
  renderApp();
});
