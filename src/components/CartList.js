import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = { cartList: [] }
    this.updateCart = this.updateCart.bind(this)
    this.props.cartContext.subscribe(this.updateCart)
    this.productsListElement = null
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  updateCart(cartList) {
    this.state.cartList = cartList;
    this.renderCartItems(); 
    this.renderTotal()
  }

  renderCartItems() {
    this.productsListElement.innerHTML = '';

    const cartItems = this.state.cartList.map(item => `
      <li>
        <div class = "cart-image">
          <img src = '${item.image}'>
        </div>  
        <div class = "cart-item">
        <p class ="item-title">${item.title}</p>
        <p class = "item-price">$${item.price} </p>
        <div class = "controls">
          <div class="quantity-controls">
            <button class="decrement-btn" data-id="${item.id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increment-btn" data-id="${item.id}">+</button>
          </div>
          <button class="delete-btn" data-id="${item.id}">Delete</button>
        </div>
      </div>
      </li>
    `).join('');

    this.productsListElement.innerHTML = cartItems;

    this.state.cartList.forEach(item => {
      const deleteButton = this.productsListElement.querySelector(`.delete-btn[data-id="${item.id}"]`);
      const incrementButton = this.productsListElement.querySelector(`.increment-btn[data-id="${item.id}"]`);
      const decrementButton = this.productsListElement.querySelector(`.decrement-btn[data-id="${item.id}"]`);

      if (deleteButton) {
        deleteButton.addEventListener('click', () => this.handleDeleteItem(item.id));
      }

      if (incrementButton) {
        incrementButton.addEventListener('click', () => this.handleIncrement(item.id));
      }

      if (decrementButton) {
        decrementButton.addEventListener('click', () => this.handleDecrement(item.id));
      }
    });
    
  }
  
  renderTotal() {
    const totalElement = this.productsListElement.closest('.cart-list').querySelector('.total-price');
    const totalPrice = this.props.cartContext.calculateTotal(); 
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`; 
  }

  handleDeleteItem(itemId) {
    this.props.cartContext.delete(itemId);
  }

  handleIncrement(itemId) {
    this.props.cartContext.incrementQuantity(itemId);
  }

  handleDecrement(itemId) {
    this.props.cartContext.decrementQuantity(itemId);
  }

  render() {
    const cartElement = document.createElement('div')
    cartElement.className = "cart-list"
    cartElement.innerHTML = `
      <div class="aside-title">
      <img class= "aside-icon" src = "./image/shopping-cart.svg">
      <h3>Cart</h3>
      </div>
      <ul></ul>
      <div class="total-price">Total: $0.00</div>
      <button class ="check-out">Check Out</button>
    `
    this.productsListElement = cartElement.querySelector('ul')

    return cartElement;
  }
}