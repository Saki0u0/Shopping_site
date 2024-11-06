import { Component } from "../common/Component.js";

export class Header extends Component {
  render() {
    const header = document.createElement('header')
    header.innerHTML = `
      <div class="logo">VogueVault</div>
      <div class="right-side">
        <img class= "icon" id="home" src = "./image/house.svg">
        <p>Home</p>
        <img class= "icon" id="cart" src = "./image/shopping-cart.svg">
        <p>Cart</p>
        <img class= "icon" id = "heart" src = "./image/heart.svg">
        <p>Favorite</p>
      </div>
    `

    return header;
  }
}