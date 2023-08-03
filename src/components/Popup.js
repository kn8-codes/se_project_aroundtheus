export default class Popup {
    constructor({popupSelector}){
       this._popupElement = document.querySelector(popupSelector); 
    }
    open(){
        this._popup.classList.add("modal-opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close(){
        this._popup.classList.remove("");
        document.removeEventListener("keydown", this._pressEsc);
    }

    _handleEscClose(event){
        if(event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        this._popup.addEventListener("mousedown", (event) => {
            if (event.target.classList.contains("modal_opened")) {
              this.close();
            }
          });
      
        this._popup
            .querySelector(".modal_opened")
            .addEventListener("click", () => this.closePopupWindow());
    }
};