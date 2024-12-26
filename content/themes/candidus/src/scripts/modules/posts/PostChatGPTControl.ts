import Control, { ControlStruct } from '../../core/base/Control';
import { chatGptArticlePrompt } from '../../util/ChatGPT';

export default class ChatGPTButton extends Control implements ControlStruct {
  chatButton: HTMLElement;
  constructor({ buttonSelector }: { buttonSelector: string }) {
    super(buttonSelector);
    if (this.valid) {
      this.chatButton = this.$query(buttonSelector);
    }
  }

  public init() {
    this.displayButton();
    this.chatButton.addEventListener('click', () => this.openChatGptWindow());
  }

  private displayButton() {
      this.chatButton.style.opacity = '1';
      this.chatButton.style.display = 'block';
      this.chatButton.classList.add('ml-1')
  }

  private openChatGptWindow() {
    const url =
      'https://chat.openai.com?q=' +
      encodeURIComponent(`${chatGptArticlePrompt}\n${window.location.href}`);
    console.log(url);
    window.open(url, '_blank');
  }
}
