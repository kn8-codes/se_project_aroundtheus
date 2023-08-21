export default class Popup {
    constructor({popupSelector}){
       this._popupElement = document.querySelector(popupSelector);
    }

    open(){
        this._popupElement.classList.add("modal_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close(){
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if(event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        this._popupElement.addEventListener("mousedown", (event) => {
            if (event.target.classList.contains("modal__close") || event.target.classList.contains('modal_opened') ) {
                this.close();
            }
        });
    }
};