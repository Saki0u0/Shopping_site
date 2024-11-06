export class FavoriteContext {
  constructor() {
    this.listeners = []
    this.favoriteList =[]
  }

  addFavorite(item) {
    this.favoriteList.push(item)
    this.notifyListeners()
  }

  deleteFavorite(itemId) {
    this.favoriteList= this.favoriteList.filter(item => item.id !== itemId);
    this.notifyListeners(); 
  }

  getFavorite(){
    return this.favoriteList
  }

  subscribe(listener) {
    this.listeners.push(listener)
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.favoriteList))
  }
}