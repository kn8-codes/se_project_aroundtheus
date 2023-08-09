export default class Popup {
    constructor({popupSelector}){
       this._popupElement = document.querySelector(popupSelector); 
    }
    open(){
        this._popupElement.classList.add("modal-opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close(){
        this._popupElement.classList.remove("");
        document.removeEventListener("keydown", this._pressEsc);
    }

    _handleEscClose(event){
        if(event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        this._popupElement.addEventListener("mousedown", (event) => {
            if (event.target.classList.contains("modal_opened") || document.querySelector("#preview-close")) {
              this.close();
            }
          });
      
    //       // try the class for the close button instead
    //     this._popupElement
    //         .querySelector("#preview-close")
    //         .addEventListener("click", () => this.close()); // use .close
    }
};