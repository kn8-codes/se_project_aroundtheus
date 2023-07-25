export default class Section {
    constructor({ items, renderer }, selector) {
      this.renderer = renderer;
      this.items = items;
      this.element = document.querySelector(selector);
    };
  
    renderItems() {
      this.items.forEach((item) => {
        this.renderer(item);
      });
    };
  
    addItem(item) {
      this.element.prepend(item);
    };
  };