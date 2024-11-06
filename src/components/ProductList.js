import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [],
      isOpen:false
     }
  }

  mount(container) {
    fetch(`https://fakestoreapi.com/products`)
      .then(response => response.json())
      .then(data => {
        this.state.products = data
        container.appendChild(this.render())
      })
      .catch(error => console.error('Error retrieving data:', error))
  }

  toggleOpen() {
    this.state.isOpen = !this.state.isOpen; 
    this.render(); 
  }

  render() {
    const productList = document.createElement('div')
    productList.className = this.state.isOpen ? "product-list-open" : "product-list"; 

    productList.innerHTML = ''

    this.state.products.forEach(product => {
      const productItem = new ProductItem({
        product,
        cartContext: this.props.cartContext,
        favoriteContext: this.props.favoriteContext,
        onClick: () => this.toggleOpen() 
      })
      productList.appendChild(productItem.render())
    })

    return productList;
  }
}