class FormValidator {
    constructor(settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._settings = settings;
        this._formEl = formEl;
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(
                this._formEl,
                inputElement,
                inputElement.validationMessage,
                this._settings,
            );
        } else {
            this._hideInputError(this._formEl, inputElement, this._settings);
        }
    }

    _toggleButtonState(inputList, buttonElement, settings) {
        if (this._formElement.checkValidity()) {
      this._submitButton.disabled = false;
    } else {
      this._submitButton.disabled = true;
    }
    }

    _setEventListeners() {
        this._inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector),
        );

        const buttonElement = this._formEl.querySelector(
            this._settings.submitButtonSelector,
        );

        this._toggleButtonState(this._inputList, buttonElement, this._settings);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(this._formEl, inputElement, this._settings);
                this._toggleButtonState(this._inputList, buttonElement, this._settings);
            });
        });
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    resetValidation() {
       this._inputList.forEach((input) => {
    input.value = '';
});
    }
}

export default FormValidator;