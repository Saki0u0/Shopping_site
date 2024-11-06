export class CartContext {
  constructor() {
    this.cartList = [] 
    this.listeners = []
  }

  addItem(item) {
    const existingItem = this.cartList.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartList.push({ ...item, quantity: 1 }); 
    }
    this.notifyListeners()
  }

  delete(itemId) {
    this.cartList= this.cartList.filter(item => item.id !== itemId);
    this.notifyListeners(); 
  }

  calculateTotal() {
    return this.cartList.reduce((total, item) => total + item.price * item.quantity , 0);
  }

  incrementQuantity(productId) {
    const item = this.cartList.find(item => item.id === productId);
    if (item) {
      item.quantity += 1;
      this.notifyListeners();
    }
  }

  decrementQuantity(productId) {
    const item = this.cartList.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.notifyListeners()
    } else if (item && item.quantity === 1) {
      this.delete(productId);  
    }
  }

  getCart() {
    return this.cartList
  }

  subscribe(listener) {
    this.listeners.push(listener)
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.cartList))
  }
}