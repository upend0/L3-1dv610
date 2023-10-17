/**
 * The translator-app web component module.
 *
 * @author Maria Fredriksson <mf223wk@student.lnu.se>
 * @version 1.0.0
 */

// ** This is a template for creating a web component.

console.log('Hi from translator-app!')

// Create a template
const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>
  <p>Hi from translator-app!</p>
`
customElements.define('translator-app',
  /**
   * Represents a translator-app element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }
  }
)
