import { openModal } from "./utils.js";

export default class Card{
    constructor({name , link}, cardSelector){
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        
    }
    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content.querySelector(".card")
          .cloneNode(true);
    
        return cardElement;
      }
      
    _setEventListeneres(){
        this._cardElement.querySelector(".card__like-button").addEventListener('click',()=>{
            this._handleLikeIcon();
        })
        
        this._cardElement.querySelector(".card__delete-button").addEventListener('click',()=>{
            this._handleDeleteCard
        })
        
        this._cardElement.querySelector(".card__image").addEventListener('click',()=>{
            this._handlePreviewClick
        })
    }
    _handleLikeIcon(){
        console.log('like button')
        this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-active')
    }

    _handleDeleteCard(){
       console.log('delete card')
        this._cardElement.remove();
        this._cardElement = null;
    }

    _handlePreviewClick(){
        console.log('preview Clcik')
        const modalPreview = document.querySelector("#modal-preview")
        const modalImage = document.querySelector(".modal__image");
        const imageTitle = document.querySelector(".modal__text");
        modalImage.src = this._link;
        modalImage.alt = "Image of " + this._name;
        imageTitle.textContent = this._name;
        openModal(modalPreview);
    }


    getView(){
      this._cardElement = this._getTemplate();
      this._setEventListeneres();
      this._cardElement.querySelector('.card__image').src = this._link
      this._cardElement.querySelector('.card__label').textContent = this._name
      this._cardElement.querySelector('.card__image').alt = this._name
    return this._cardElement;
    }
}
