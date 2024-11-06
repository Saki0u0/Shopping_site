import { Component } from "../common/Component.js";

export class FavoriteItem extends Component {
  constructor(props) {
    super(props)
    this.handleAddToFavorite = this.handleAddToFavorite.bind(this)
  }

  handleAddToCart() {
    console.log('test')
    const item = { id: 10, name: "Samsung Galaxy 100", price: 1500.00 }
    this.props.favoriteContext.addItem(item)
  }

  render() {
      const product = document.createElement('div')
    product.innerHTML = `
      <h3>Samsung Galaxy 100</h3>
      <p>1500.00</p>
      <button class="favorite">Add to Favorite</button>
    `

    product.querySelector('.favorite').addEventListener('click', this.handleAddToFavorite)

    return product;
  }
}