/**
 * The translator-app web component module.
 *
 * @author Maria Fredriksson <mf223wk@student.lnu.se>
 * @version 1.0.0
 */

import './../translator-components/the-all-language-translator'
import './../translator-components/fig-language-translator'
import './../translator-components/i-language-translator'
import './../translator-components/p-language-translator'
import './../translator-components/robber-language-translator'
import './../input-form'
import './../error-text-field'
import './../footer-component'
import './../text-field'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      /* align-items: center; */
      justify-content: center;
      height: 100vh; /* This ensures the component takes up the full viewport height */
      font-family: 'Verdana', sans-serif; 
      font-size: 24px;
    }

    /* Apply the font style to all descendants */
    * {
      font-family: inherit;
      font-size: inherit;
    }

    .container {
      background-color: #3aa1f5;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
  </style>
  <div class="container">
    <input-form></input-form>
    <error-text-field></error-text-field>
    <div id="translation-container">
      <p>Välj ett påhittat språk att översätta till:</p>
      <the-all-language-translator class="translate-buttons"></the-all-language-translator>
      <fig-language-translator class="translate-buttons"></fig-language-translator>
      <i-language-translator class="translate-buttons"></i-language-translator>
      <p-language-translator class="translate-buttons"></p-language-translator>
      <robber-language-translator class="translate-buttons"></robber-language-translator>
    </div>
    <text-field></text-field>
  </div>
  <footer-component></footer-component>
`

customElements.define('translator-app',
  /**
   * Represents a translator-app element.
   */
  class extends HTMLElement {
    #inputForm
    #errorTextField
    #textField
    #translationContainer
    #translateButtons

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#assignPrivateFields()

      this.#addEventListeners()
    }

    /**
     * Assigns values to private fields.
     */
    #assignPrivateFields () {
      this.#inputForm = this.shadowRoot.querySelector('input-form')
      this.#errorTextField = this.shadowRoot.querySelector('error-text-field')
      this.#textField = this.shadowRoot.querySelector('text-field')
      this.#translationContainer = this.shadowRoot.querySelector('#translation-container')
      this.#translateButtons = this.shadowRoot.querySelectorAll('.translate-buttons')
    }

    /**
     * Adds event listeners.
     */
    #addEventListeners () {
      this.#inputForm.addEventListener('textSubmitted', event => this.#validTextSubmitted(event.detail))
      this.#inputForm.addEventListener('invalidCharacters', event => this.#invalidTextSubmitted(event.detail))
      this.#inputForm.addEventListener('emptyString', this.#removeTextFromTranslateButtons.bind(this))
      this.#translationContainer.addEventListener('textTranslated', event => this.#showTranslatedText(event.detail))
      this.#translationContainer.addEventListener('errorFromModule', event => this.#errorFromModule(event.detail))
    }

    /**
     * When a valid text is submitted, any error message is removed and the translate buttons are notified of the submitted text.
     *
     * @param {string} submittedText - The submitted text.
     */
    #validTextSubmitted (submittedText) {
      this.#removeErrorMessage()

      this.#notifyTranslateButtonsOfSubmittedText(submittedText)
    }

    /**
     * Removes the error message.
     */
    #removeErrorMessage () {
      this.#errorTextField.setAttribute('error-message', '')
    }

    /**
     * Loop through the translate buttons and set the submitted text as an attribute to them.
     *
     * @param {string} submittedText - The submitted text.
     */
    #notifyTranslateButtonsOfSubmittedText (submittedText) {
      this.#translateButtons.forEach(button => {
        button.setAttribute('text', submittedText)
      })
    }

    /**
     * When an invalid text is submitted, an error message is shown and the text is removed
     * so the translate buttons can't translate it.
     *
     * @param {string} errorMessage - The error message to show.
     */
    #invalidTextSubmitted (errorMessage) {
      this.#showErrorMessage(errorMessage)

      this.#removeTextFromTranslateButtons()

      this.#removeTranslatedText()
    }

    /**
     * When an error occurs in one of the translate buttons, an error message is shown and the translated text is removed.
     *
     * @param {string} errorMessage - The error message to show.
     */
    #errorFromModule (errorMessage) {
      this.#showErrorMessage(errorMessage)

      this.#removeTranslatedText()
    }

    /**
     * Shows an error message.
     *
     * @param {string} errorMessage - The error message to show.
     */
    #showErrorMessage (errorMessage) {
      this.#errorTextField.setAttribute('error-message', errorMessage)
    }

    /**
     * Removes the submitted text from the translate buttons.
     */
    #removeTextFromTranslateButtons () {
      this.#translateButtons.forEach(button => {
        button.setAttribute('text', '')
      })
    }

    /**
     * Removes the translated text from the text field.
     */
    #removeTranslatedText () {
      this.#textField.setAttribute('text', '')
    }

    /**
     * Shows the translated text in the text field.
     *
     * @param {string} translatedText - The translated text.
     */
    #showTranslatedText (translatedText) {
      this.#textField.setAttribute('text', translatedText)
    }
  }
)
