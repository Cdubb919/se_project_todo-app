class Todo {
    constructor(data, selector, handleCheck, handleDelete) {
        this._date = data.date;
        this._templateElement = document.querySelector(selector);
        this._handleCheck = handleCheck;
        this._selector = selector;
        this._id = data.id;
        this._completed = data.completed;
        this._name = data.name;
        this._handleDelete = handleDelete;
    };

    _setEventListeners() {
        const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
        todoDeleteBtn.addEventListener("click", () => {
            this._handleDelete();
            this._todoElement.remove();
            this._todoElement = null;
            this._handleCheck(this._completed);
        });

        this._todoCheckboxEl.addEventListener("change", () => {
            this._completed = !this._completed;
            this._handleCheck(this._completed);
        });
    }

    _generateCheckboxEl() {
        this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
        this._todoLabel = this._todoElement.querySelector(".todo__label");
        this._todoCheckboxEl.checked = this._completed;
        this._todoCheckboxEl.id = `todo-${this._id}`;
        this._todoLabel.setAttribute("for", `todo-${this._id}`);
    }

    getView() {
        this._todoElement = this._templateElement.content
            .querySelector(".todo")
            .cloneNode(true);

        const todoNameEl = this._todoElement.querySelector(".todo__name");
        const todoDate = this._todoElement.querySelector(".todo__date");

        todoNameEl.textContent = this._name;
        const dueDate = new Date(this._date);
        if (!isNaN(dueDate)) {
            todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}`;
        }

        this._generateCheckboxEl();
        this._setEventListeners();

        return this._todoElement;
    }
}


export default Todo;