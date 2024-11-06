import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement('footer')
    footer.innerHTML = `

      <p>Copyright 2024. ${this.props.copyrightText}</p>
    `

    return footer;
  }
}