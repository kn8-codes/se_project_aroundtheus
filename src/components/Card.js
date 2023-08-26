export default class Card{
    constructor({name , link}, cardSelector, handleImageClick){
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        
    }
    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content.querySelector(".card")
          .cloneNode(true);
        return cardElement;
      }
      
    _setEventListeners(){
        this._cardElement.querySelector(".card__like-button").addEventListener('click',()=>{
            this._handleLikeIcon();
        })
        
        this._cardElement.querySelector(".card__delete-button").addEventListener('click',()=>{
            this._handleDeleteCard();
        })
        
         this._cardElement.querySelector(".card__image").addEventListener('click', () =>{
            this._handleImageClick({name:this._name,link:this._link});
        });
         
    }
    _handleLikeIcon(){
        this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-active')
    }

    _handleDeleteCard(){
        this._cardElement.remove();
        this._cardElement = null;
    }

    getView(){
      this._cardElement = this._getTemplate();
      this._setEventListeners();
      this._cardElement.querySelector('.card__image').src = this._link
      this._cardElement.querySelector('.card__label-title').textContent = this._name
      this._cardElement.querySelector('.card__image').alt = this._name
      return this._cardElement;
    }
}
