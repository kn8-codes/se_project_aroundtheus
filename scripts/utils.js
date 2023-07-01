export function openModal(modal){
  modal.classList.add("modal_opened");
  overlay.addEventListener('mousedown' , closeModalByClick);
  document.addEventListener('keydown' , closeModalByEscape);
  }
  
export function closeModal(modal){
  modal.classList.remove("modal_opened");
  overlay.removeEventListener('mousedown' , closeModalByClick);
  document.removeEventListener('keydown' , closeModalByEscape);
  }

export function closeModalByEscape(event) {
  if(event.key === 'Escape') {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }};

export function closeModalByClick(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
    }
  }