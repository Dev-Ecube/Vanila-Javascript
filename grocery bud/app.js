// ****** SELECT ITEMS **********
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");

const grocery = document.querySelector(".input-text");
const submitBtn = document.querySelector(".btn-submit");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    createListItem(id, value);
    defaultAlert("item successfully added", "success");
    container.classList.add("show-grocery-container");
    addToLocalStorage(id, value);
    backToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    defaultAlert("value changed", "success");
    editLocalStorage(editID, value);
    backToDefault();
  } else {
    defaultAlert("please enter a value", "danger");
  }
}

function defaultAlert(text, alarm) {
  alert.textContent = text;
  alert.classList.add(`alert-${alarm}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${alarm}`);
  }, 1000);
}

function backToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

function clearItems() {
  list.innerHTML = "";
  container.classList.remove("show-grocery-container");
  defaultAlert("Item(s) cleared", "danger");
  backToDefault();
  localStorage.removeItem("list");
}

function deleteItem(e) {
  const element = e.target.closest(".grocery-item");
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-grocery-container");
  }
  backToDefault();
  defaultAlert("item removed", "danger");
  removeFromLocalStorage(id);
}

function editItem(e) {
  const element = e.target.closest(".grocery-item");
  console.log(element);
  editElement = element.querySelector(".item");
  grocery.value = editElement.textContent;

  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("list")) || [];
}

function editLocalStorage(id, value) {
  const items = getLocalStorage();
  const updatedItems = items.map((item) => {
    return item.id === id ? { ...item, value } : item;
  });
  localStorage.setItem("list", JSON.stringify(updatedItems));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => item.id !== id);
  localStorage.setItem("list", JSON.stringify(items));
}

// ****** SETUP ITEMS **********

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-grocery-container");
  }
}
function createListItem(id, value) {
  const element = document.createElement("article");
  element.classList.add("grocery-item");
  element.setAttribute("data-id", id);
  // console.log(element);
  element.innerHTML = `
 <p class="item">${value}</p>
              <div class="btn-container">
                <button class="btn-edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
  `;
  const editBtn = element.querySelector(".btn-edit");
  editBtn.addEventListener("click", editItem);

  const deleteBtn = element.querySelector(".btn-delete");
  deleteBtn.addEventListener("click", deleteItem);
  list.appendChild(element);
}
