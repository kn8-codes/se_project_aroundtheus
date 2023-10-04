export default class Card {
    constructor({ data, handleImageClick, handleDeleteClick, handleLikeClick, userId },
        cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._isLiked = data.isLiked;
        this._userId = userId;
        this._ownerId = data.owner._id;

        this._handleImageClick = handleImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._cardSelector = cardSelector;

    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }

    _addDeleteIcon() {
        this._deleteButton.classList.remove("card__delete-button_hidden");
        this._deleteButton.addEventListener("click", () =>
            this._handleDeleteClick()
        );
    }


    _setEventListeners() {
        this._cardElement.querySelector(".card__like-button").addEventListener('click', () => {
            this._handleLikeClick();
        })

        this._cardElement.querySelector(".card__delete-button").addEventListener('click', () => {
            this._handleDeleteClick();
        })

        this._cardElement.querySelector(".card__image").addEventListener('click', () => {
            this._handleImageClick({ name: this._name, link: this._link });
        });

    }
    _handleLikeIcon() {
        this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-active')
    }
    
    removeCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    setLikes(isLiked) {
        console.log(isLiked)
        this._isLiked = isLiked;
        //this._cardElement.querySelector(".card__like-button").classList.add("card__like-active");
        this._renderlikes();
    }
    
    _renderlikes() {
        if (this._isLiked) {
            this._cardElement.querySelector(".card__like-button").classList.add("card__like-active");
        } else {
            this._cardElement.querySelector(".card__like-button").classList.remove("card__like-active");
        }
      }

    isLiked() {
        return this._isLiked;
    }

    getView() {
        // this._cardElement = this._getTemplate();
        // this._setEventListeners();
        // this._cardElement.querySelector('.card__image').src = this._link
        // this._cardElement.querySelector('.card__label-title').textContent = this._name
        // this._cardElement.querySelector('.card__image').alt = this._name
        // return this._cardElement;
        this._cardElement = this._getTemplate();

        this._likeButton = this._cardElement.querySelector(".card__like-button");
        this._deleteButton = this._cardElement.querySelector(".card__delete-button");
        this._imageElement = this._cardElement.querySelector(".card__image");
        this._cardname = this._cardElement.querySelector(".card__label-title");

        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._cardname.textContent = this._name;

        if (this._ownerId === this._userId) {
            this._addDeleteIcon();
        }
        this._renderlikes();
        this._setEventListeners();
        return this._cardElement;
    }
}
