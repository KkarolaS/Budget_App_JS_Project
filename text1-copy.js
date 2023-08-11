const incomeInput = document.querySelector("#income-name-input");
const expanseInput = document.querySelector("#expense-name-input");
const amountIncomeInput = document.querySelector("#amount-income-input");
const amountExpenseInput = document.querySelector("#amount-expense-input");
const incomeAddButton = document.querySelector("#income-add-button");
const expanseAddButton = document.querySelector("#expense-add-button");

//add icome inputs to list
const createInputElement = (value) => {
  const incomeItem = document.createElement("li");
  incomeItem.classList.add("icome-item");
  incomeItem.id = "icome-item";
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

const createTextBtnContainer = () => {
  const inputBtnContainer = document.createElement("div");
  inputBtnContainer.id = "input-btn-container";
  inputBtnContainer.classList.add("input-btn-container");
  return inputBtnContainer;
};

const createBtnWrapper = () => {
  const btnWrapper = document.createElement("div");
  btnWrapper.id = "btn-wrapper";
  btnWrapper.classList.add("btn-wrapper");
  return btnWrapper;
};

const sumArray = [];

const sumIncome = () => {
  console.log(sumArray);
  const newSumArray = sumArray.map((item) => {
    return item.replace(",", ".");
  });

  let sumNumberArray = newSumArray.map(Number);
  sumNumberArray = sumNumberArray.filter((item) => {
    if (item !== NaN && item !== 0) {
      return item;
    }
  });
  console.log(sumNumberArray);

  const sumIncomeItems = sumNumberArray.reduce((acc, number) => {
    return acc + number;
  }, 0);
  const fixedSumIncomeItems = sumIncomeItems.toFixed(2);
  const incomeSumInfo = document.querySelector("#income-sum");

  incomeSumInfo.textContent = `${fixedSumIncomeItems} zł`;
};

const createIncomeList = () => {
  const incomeList = document.querySelector("#income-list");

  incomeAddButton.addEventListener("click", function () {
    let incomeInputName = incomeInput.value;
    let incomeAmountName = amountIncomeInput.value;
    incomeAmountName = incomeAmountName.replace(".", ",");
    if (incomeInputName !== "" && incomeAmountName !== "") {
      let fullItemName = `${incomeInputName} - ${incomeAmountName} zł`;

      const elementContainer = createTextBtnContainer();
      incomeList.appendChild(elementContainer);
      const li = createInputElement(fullItemName);
      elementContainer.appendChild(li);
      const amountArrLenght = sumArray.push(incomeAmountName);
      const amountArrCount = amountArrLenght - 1;
      sumIncome();

      const btnWrapper = createBtnWrapper();
      elementContainer.appendChild(btnWrapper);
      const changeBtn = createChangeBtn();
      btnWrapper.appendChild(changeBtn);

      changeBtn.addEventListener("click", function () {
        const changeInputName = document.createElement("input");
        // changeInputName.id = "change-input";
        changeInputName.classList.add(
          "input",
          "change-input",
          "change-input-name"
        );
        changeInputName.value = incomeInputName;
        elementContainer.appendChild(changeInputName);
        const changeInputAmount = document.createElement("input");
        changeInputAmount.classList.add("input", "change-input");
        changeInputAmount.value = incomeAmountName;
        elementContainer.appendChild(changeInputAmount);
        sumIncome();

        li.classList.add("hidden");
        changeBtn.classList.add("hidden");
        deleteBtn.classList.add("hidden");

        const changeAcceptBtn = document.createElement("button");
        // changeAcceptBtn.id = "change-accept-btn";
        changeAcceptBtn.classList.add("change-accept-btn", "add-btn");
        changeAcceptBtn.textContent = "Zapisz";
        elementContainer.appendChild(changeAcceptBtn);

        changeAcceptBtn.addEventListener("click", function () {
          incomeInputName = changeInputName.value;
          incomeAmountName = changeInputAmount.value;
          incomeAmountName = incomeAmountName.replace(".", ",");
          fullItemName = `${incomeInputName} - ${incomeAmountName} zł`;
          li.textContent = fullItemName;
          sumArray[amountArrCount] = incomeAmountName;
          console.log(amountArrCount);
          sumIncome();

          li.classList.remove("hidden");
          changeBtn.classList.remove("hidden");
          deleteBtn.classList.remove("hidden");
          elementContainer.removeChild(changeInputName);
          elementContainer.removeChild(changeInputAmount);
          elementContainer.removeChild(changeAcceptBtn);
        });
      });

      const deleteBtn = createDeleteBtn();
      btnWrapper.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", function () {
        incomeList.removeChild(elementContainer);

        // sumArray.splice(amountArrCount, 1);
        // amountArrCount - 1;
        //powysze nie działa bo się gubi

        sumArray[amountArrCount] = "0";
        console.log(amountArrCount);

        sumIncome();
      });

      incomeInput.value = "";
      amountIncomeInput.value = "";
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  createIncomeList();
  sumIncome();
});
