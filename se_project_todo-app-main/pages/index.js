import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import TodoCounter from '../components/TodoCounter.js';

import Popup from '../components/Popup.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopupEl = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const id = uuidv4();
    const todoData = { id: id, name: values.name, date: values.date, completed: false};
  renderTodo(todoData);
  todoCounter.updateTotal(true);
  addTodoPopupEl.close();
  }
});
addTodoPopupEl.setEventListeners();

const section = new Section({
  items: [],
  renderer: (item) => { },
  containerSelector: ".todos__list",
});

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

function handleCheck() {
  todoCounter.updateCompleted(completed);
}

function handleDelete() {
  if (completed) {
    todoCounter.updateCompleted(false)
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const TodoElement = todo.getView();
  return TodoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopupEl.open();
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();
