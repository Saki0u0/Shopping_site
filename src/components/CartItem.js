import { Component } from "../common/Component.js";

export class CartItem extends Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart() {
    console.log('test')
    const item = { id: 10, name: "Samsung Galaxy 100", price: 1500.00 }
    this.props.cartContext.addItem(item)
  }

  render() {
      const product = document.createElement('div')
    product.innerHTML = `
      <h3>Samsung Galaxy 100</h3>
      <p>1500.00</p>
      <button id="add-to-cart-btn">Add to Cart</button>
    `

    product.querySelector('#add-to-cart-btn').addEventListener('click', this.handleAddToCart)

    return product;
  }
}