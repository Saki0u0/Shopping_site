import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleAddToFavorite = this.handleAddToFavorite.bind(this)
    this.handleDeleteFavorite = this.handleDeleteFavorite.bind(this)
  }

  handleAddToCart = () => {
    this.props.cartContext.addItem(this.props.product)
  }

  handleAddToFavorite = () => {
    this.props.favoriteContext.addFavorite(this.props.product)
  }

  handleDeleteFavorite = () => {
    this.props.favoriteContext.deleteFavorite(this.props.product.id);
  }

  render() {
    const product = document.createElement('div')
    product.className = "product-item"
    product.innerHTML = `
      <div class = "image">
        <img src = '${this.props.product.image}'>
      </div>  
      <div class = "details">
      <div class = "detail">
        <div class = "product-image">
          <img class="detail-image" src = '${this.props.product.image}' >
        </div>
        <div class = "product-description">
          <h3>${this.props.product.title}</h3>
          <p class="description">${this.props.product.description}</p>
          <div class= "price-rate">
            <p class ="price">$${this.props.product.price}</p>
            <p class = "rate">☆${this.props.product.rating.rate}(${this.props.product.rating.count})</p>
          </div>
            <div class = "cart">
            <img class="favorite" src ="./image/heart.svg">
            <img class="favorite-liked" src ="./image/heart-liked.svg">
              <img class= "add-to-cart" src = "./image/shopping-cart.svg">
              <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
      </div>
      </div>
    `
    product.querySelector('.image').addEventListener('click',() => {
      this.props.onClick(); 
      console.log('click')
      const prodcutList = document.querySelector('.product-list').classList.add('product-list-open')
    }); 

    product.querySelector('.add-to-cart-btn').addEventListener('click', this.handleAddToCart)

      const favorite = product.querySelector('.favorite')
      const favoriteLiked = product.querySelector('.favorite-liked')
      favoriteLiked.classList.add('off');

      favorite.addEventListener('click', () => {
        favorite.style.display = 'none'; 
        favoriteLiked.style.display = 'block';
        this.handleAddToFavorite(); 
      });
  
      favoriteLiked.addEventListener('click', () => {
        favoriteLiked.style.display = 'none'; 
        favorite.style.display = 'block'; 
        this.handleDeleteFavorite(); 
        console.log("delete");
      });

      
      const currentDetail = product.querySelector('.details')
      const image = product.querySelector('.image')
      
      image.addEventListener('click', () => {
        const details = document.querySelectorAll('.details')
        details.forEach(detail => {
          detail.classList.remove('on')
        })
        currentDetail.classList.toggle('on')
      });

    return product;
  }
}