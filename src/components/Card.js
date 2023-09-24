export default class Card {
    constructor({ data, handleImageClick, handleDeleteClick, handleLikeClick, userId },
        cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._likes = data.likes;
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
    _renderlikes() {
        this._totalLikes.textContent = this._likes.length;

        if (this.isLiked()) {
            this._likeButton.classList.add("card__like-button_active");
        } else {
            this._likeButton.classList.remove("card__like-button_active");
        }
    }

    _addDeleteIcon() {
        this._deleteButton.classList.remove("card__delete-button_hidden");
        this._deleteButton.addEventListener("click", () =>
            this._handleDeleteClick()
        );
    }


    _setEventListeners() {
        this._cardElement.querySelector(".card__like-button").addEventListener('click', () => {
            this._handleLikeIcon();
        })

        this._cardElement.querySelector(".card__delete-button").addEventListener('click', () => {
            this._handleDeleteCard();
        })

        this._cardElement.querySelector(".card__image").addEventListener('click', () => {
            this._handleImageClick({ name: this._name, link: this._link });
        });

    }
    _handleLikeIcon() {
        this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-active')
    }

    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    getView() {
        this._cardElement = this._getTemplate();
        this._setEventListeners();
        this._cardElement.querySelector('.card__image').src = this._link
        this._cardElement.querySelector('.card__label-title').textContent = this._name
        this._cardElement.querySelector('.card__image').alt = this._name
        return this._cardElement;
    }
}
