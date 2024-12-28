import Control, { ControlStruct } from '../../core/base/Control';
import { chatGptArticlePrompt } from '../../util/ChatGPT';

/**
 * Control class that displays a button to open ChatGPT in a new tab.
 * The button is only visible if the element with the given selector is found.
 * The button is attached to this element.
 */
export default class PostChatGPTControl extends Control implements ControlStruct {
  /**
   * The button element.
   */
  chatButton: HTMLElement;

  /**
   * @param {Object} options - An object containing the options.
   * @param {string} options.buttonSelector - The selector of the element to
   * attach the button to.
   */
  constructor({ buttonSelector }: { buttonSelector: string }) {
    super(buttonSelector);
    if (this.valid) {
      this.chatButton = this.$query(buttonSelector);
    }
  }

  /**
   * Initializes the control. This method is called automatically when the
   * control is created.
   */
  public init() {
    this.displayButton();
    this.chatButton.addEventListener('click', () => this.openChatGptWindow());
  }

  /**
   * Function to display the button on a post
   */
  private displayButton() {
    this.chatButton.style.opacity = '1';
    this.chatButton.style.display = 'block';
    this.chatButton.classList.add('ml-1');
  }

  /**
   * Opens ChatGPT in a new browser tab.
   */
  private openChatGptWindow() {
    const url =
      'https://chat.openai.com?q=' +
      encodeURIComponent(`${chatGptArticlePrompt}\n${window.location.href}`);
    console.log(url);
    window.open(url, '_blank');
  }
}

