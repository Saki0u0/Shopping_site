import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { CartList } from "./CartList.js";
import { ProductList } from "./ProductList.js";
import { FavoriteList } from "./FavoriteList.js";

export class App extends Component {
  render() {
    const appContainer = document.createElement('div')
    appContainer.className = 'container'
    appContainer.innerHTML = `
      <div class="header-wrapper"></div>
      <div class="content">
        <main>
         <div class = "main-visual">
          </div>
        </main>
        <aside class="sidebar">
        <img class="close" src ="./image/close.svg">
        </aside>
      </div>
      
      <div class="footer-wrapper"></div>
    `
    // Render components
    const header = new Header().render()
    const footer = new Footer({ copyrightText: 'A-0524 All Rights Reserved.' }).render()
    const cartList = new CartList({ cartContext: this.props.cartContext }).render()
    const productList = new ProductList({ 
      cartContext: this.props.cartContext,
      favoriteContext: this.props.favoriteContext,
     })
    const favoriteList = new FavoriteList({ favoriteContext: this.props.favoriteContext }).render()



    // Append components into the DOM
    appContainer.querySelector('.header-wrapper').appendChild(header)
    appContainer.querySelector('.footer-wrapper').appendChild(footer)
    appContainer.querySelector('aside').appendChild(cartList)
    appContainer.querySelector('aside').appendChild(favoriteList)

    productList.mount(appContainer.querySelector('main'))

    setTimeout(() => {
      const cartIcon = document.querySelector('#cart')
      const heartIcon = appContainer.querySelector('#heart')
      const sidebar = appContainer.querySelector('.sidebar')
      const close = appContainer.querySelector('.close')
      const homeIcon = appContainer.querySelector('#home')

      if(homeIcon){
        homeIcon.addEventListener('click',() => {
          const prodcutList = document.querySelector('.product-list').classList.remove('product-list-open')
          const detail = document.querySelector('.detail')
          const details = document.querySelectorAll('.details')
          detail.style.display = "none"
          details.forEach(detail => {
            detail.classList.remove('on')
          })
          console.log('click')
        })
      }

      if (cartIcon) {
        cartIcon.addEventListener('click', () => {
          sidebar.classList.toggle('open-menu')
        });
      }

      if (heartIcon) {
        heartIcon.addEventListener('click', () => {
          sidebar.classList.toggle('open-menu')
        });
      }

      if(close){
        close.addEventListener('click', () => {
          sidebar.classList.remove('open-menu')
          console.log("click")
        });
      }
    }, 0)

    return appContainer;
  }
}