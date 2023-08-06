const incomeInput = document.querySelector("#income-name-input");
const expanseInput = document.querySelector("#expense-name-input");
const amountIncomeInput = document.querySelector("#amount-income-input");
const amountExpenseInput = document.querySelector("#amount-expense-input");
const incomeAddButton = document.querySelector("#income-add-button");
const expanseAddButton = document.querySelector("#expense-add-button");

// create list with inputs and add icome and expanse inputs to list
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

const createIncomeList = () => {
  const incomeList = document.querySelector("#income-list");

  incomeAddButton.addEventListener("click", function () {
    const incomeInputName = incomeInput.value;
    const incomeAmountName = amountIncomeInput.value;
    if (incomeInputName !== "" && incomeAmountName !== "") {
      const fullItemName = `${incomeInputName} - ${incomeAmountName} zł`;
      const elementContainer = createTextBtnContainer();
      incomeList.appendChild(elementContainer);

      const li = createInputElement(fullItemName);
      elementContainer.appendChild(li);

      const btnWrapper = createBtnWrapper();
      elementContainer.appendChild(btnWrapper);

      const changeBtn = createChangeBtn();
      btnWrapper.appendChild(changeBtn);

      changeBtn.addEventListener("click", function () {
        // const changeElmWrapper = document.createElement("div");
        // changeElmWrapper.classList.add("change-elm-wrapper");
        // elementContainer.appendChild(changeElmWrapper);

        const changeInput = document.createElement("input");
        // changeInput.id = "change-input";
        changeInput.classList.add("input");
        changeInput.value = li.textContent;
        li.classList.add("hidden");
        changeBtn.classList.add("hidden");
        deleteBtn.classList.add("hidden");
        elementContainer.appendChild(changeInput);

        const changeAcceptBtn = document.createElement("button");
        // changeAcceptBtn.id = "change-accept-btn";
        changeAcceptBtn.classList.add("change-accept-btn", "add-btn");
        changeAcceptBtn.textContent = "Zapisz";
        elementContainer.appendChild(changeAcceptBtn);

        changeAcceptBtn.addEventListener("click", function () {
          li.textContent = changeInput.value;
          li.classList.remove("hidden");
          changeBtn.classList.remove("hidden");
          deleteBtn.classList.remove("hidden");
          elementContainer.removeChild(changeInput);
          elementContainer.removeChild(changeAcceptBtn);
        });
      });

      const deleteBtn = createDeleteBtn();
      btnWrapper.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", function () {
        incomeList.removeChild(elementContainer);
      });

      incomeInput.value = "";
      amountIncomeInput.value = "";
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  createIncomeList();
});

//
//
//
//
//
//
//
//
//
//

// niepotrzebny kod z wartościami value

// const inputValueDelete = (element) => {
//   element.value = "";
// };
// const inputShowHide = () => {
//   const inputList = document.querySelectorAll(".input");
//   for (const element of inputList) {
//     element.addEventListener("click", function () {
//       inputValueDelete(element);
//     });
//   }
//   document.body.addEventListener("click", function (event) {
//     const inputId = event.target.getAttribute("id");
//     if (inputId !== "income-name-input") {
//       if (incomeInput.value === "") {
//         incomeInput.value = "Nazwa przychodu";
//       }
//     }
//     if (inputId !== "expense-name-input") {
//       if (expanseInput.value === "") {
//         expanseInput.value = "Nazwa wydatku";
//       }
//     }
//     if (inputId !== "amount-income-input") {
//       if (amountIncomeInput.value === "") {
//         amountIncomeInput.value = "Kwota";
//       }
//     }
//     if (inputId !== "amount-expense-input") {
//       if (amountExpenseInput.value === "") {
//         amountExpenseInput.value = "Kwota";
//       }
//     }
//   });
//   // const incomeAddButton = document.querySelector("#income-add-button");
//   incomeAddButton.addEventListener("click", function () {
//     incomeInput.value = "Nazwa przychodu";
//     amountIncomeInput.value = "Kwota";
//   });
//   // const expanseAddButton = document.querySelector("#expense-add-button");
//   expanseAddButton.addEventListener("click", function () {
//     expanseInput.value = "Nazwa wydatku";
//     amountExpenseInput.value = "Kwota";
//   });
// };

// class Item {
//   constructor(name, amount = 0) {
//     this.name = name;
//     this.amount = amount;
//   }
//   get fullItemName() {
//     return `${this.name} ${this.amount} zł`;
//   }
// }

// const createNewItemName = () => {
//   const incomeItemName = incomeInput.value;
//   const incomeItemAmount = amountIncomeInput.value;
//   const incomeItem = new Item(incomeItemName, incomeItemAmount);
//   const incomeItemFullName = incomeItem.fullItemName;
//   return incomeItemFullName;
// };
