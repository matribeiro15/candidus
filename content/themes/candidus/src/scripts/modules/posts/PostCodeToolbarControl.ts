interface PostCodeToolbarControlOptions {
  containerSelector: string;
}

import Control, { ControlStruct } from '../../core/base/Control';
import Renderer from '../../core/base/Renderer';
import UserDevice from '../../core/device/UserDevice';
/**
 * This class renders a toolbar for code blocks to copy them to the clipboard.
 */
export default class PostCodeToolbarControl extends Control implements ControlStruct {
  /**
   * A list of all code blocks on the page.
   */
  codeContainerElements: NodeList;
  /**
   * A renderer object to create the HTML elements.
   */
  renderer: Renderer;
  /**
   * A device object to check the current screen size.
   */
  device: UserDevice;
  /**
   * A template for the clipboard button.
   */
  clipboardButtonTemplate: HTMLElement;

  /**
   * The constructor of the class.
   * @param {PostCodeToolbarControlOptions} options - The options for the class.
   */
  constructor({
    containerSelector
  }: PostCodeToolbarControlOptions) {
    super(containerSelector);
    this.device = new UserDevice();
    this.codeContainerElements = this.$queryAll(containerSelector);
    this.renderer = new Renderer();
    this.clipboardButtonTemplate = this.renderer.$create({
      tag: 'button', options: {
        classList: ["btn", "m-2"],
        innerHTML: `<svg width='18px' height='18px' role='img'><use xlink:href='#clipboard-button-template'></use></svg>`,
        attributes: {
          style: "position: absolute; top: 0; right: 0; opacity: 0; transition: opacity 0.25s;"
        }
      }
    })
  }

  /**
   * Initialize the class.
   */
  public init() {
    const isSmallerDevice = this.device.getDeviceType() === 'mobile-sm' || this.device.getDeviceType() === 'mobile-md'
    if (this.valid && !isSmallerDevice) {
      this.renderToolbar();
    }
  }

  /**
   * Render the toolbar for all code blocks.
   */
  private renderToolbar() {
    this.codeContainerElements.forEach((element: HTMLElement) => {
      const icon = this.assembleClipboardButton(element)
      this.appendToolbarToCode(element, icon);
    })
  };

  /**
   * Append the toolbar to the code block.
   * @param {HTMLElement} element - The code block.
   * @param {HTMLElement} icon - The toolbar button.
   */
  private appendToolbarToCode(element: HTMLElement, icon: HTMLElement) {
    element.style.position = "relative";
    element.addEventListener('mouseenter', () => icon.style.opacity = "1")
    element.addEventListener('mouseleave', () => icon.style.opacity = "0")
    element.prepend(icon)
  }

  /**
   * Assemble the clipboard button.
   * @param {HTMLElement} element - The code block.
   * @returns {HTMLElement} - The assembled button.
   */
  private assembleClipboardButton(element: HTMLElement): HTMLElement {
    const icon = this.clipboardButtonTemplate.cloneNode(true) as HTMLElement;
    icon.addEventListener('click', () => {
      icon.style.color = "green"
      navigator.clipboard.writeText(element.innerText)})
      setTimeout(() => icon.style.color = null, 5000)
    return icon;
  }
}
