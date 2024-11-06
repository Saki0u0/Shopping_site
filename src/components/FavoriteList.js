import { Component } from "../common/Component.js";
import { FavoriteItem } from "./FavoriteItem.js";

export class FavoriteList extends Component {
  constructor(props) {
    super(props)
    this.state = { favoriteList: [] }
    this.updateFavorite = this.updateFavorite.bind(this)
    this.props.favoriteContext.subscribe(this.updateFavorite)
    this.favoriteListElement = null
    this.handleDeleteFavorite = this.handleDeleteFavorite.bind(this)
  }

  updateFavorite(favoriteList) {
    this.state.favoriteList = favoriteList;
    this.renderFavoriteItems(); 
  }

  renderFavoriteItems() {
    this.favoriteListElement.innerHTML = '';

    const favoriteItems = this.state.favoriteList.map(item => `
      <li>
        <div class = "cart-image">
          <img src = '${item.image}'>
        </div> 
        <div class = "cart-item">
          <p class ="item-title">${item.title}</p>
          <p class = "item-price">$${item.price} </p>
          <button class="delete-btn" data-id="${item.id}">Delete</button>
        </div>
      </li>
    `).join('');

    this.favoriteListElement.innerHTML = favoriteItems;

    this.state.favoriteList.forEach(item => {
      const deleteButton = this.favoriteListElement.querySelector(`.delete-btn[data-id="${item.id}"]`);
      if (deleteButton) {
        deleteButton.addEventListener('click', () => this.handleDeleteFavorite(item.id));
      }
    });
  }

  handleDeleteFavorite(itemId) {
    this.props.favoriteContext.deleteFavorite(itemId);
  }

  render() {
    const favoriteElement = document.createElement('div')
    favoriteElement.className = "favorite-list"
    favoriteElement.innerHTML = `
      <div class="aside-title">
        <img class= "aside-icon" id = "heart" src = "./image/heart.svg">
        <h3>Favorite</h3>
      </div>
      <ul></ul>
    `
    this.favoriteListElement = favoriteElement.querySelector('ul')

    return favoriteElement;
  }
}