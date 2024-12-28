

import Control, { ControlStruct } from '../../core/base/Control';
import Renderer from '../../core/base/Renderer';

/**
 * A class representing a control for zooming images in a post.
 * @class
 */
export default class PostImageZoomControl extends Control implements ControlStruct {
  /**
   * A list of all images in the post.
   */
  images: NodeList;
  /**
   * A renderer for HTML elements.
   */
  renderer: Renderer;
  /**
   * The zoomed in image element.
   */
  zoomedImage: HTMLImageElement;
  /**
   * An element used to shade the background while the image is zoomed.
   */
  backgroundShade: HTMLElement;

  /**
   * @constructor
   * @description Initializes the control and registers the image zoom event.
   */
  constructor() {
    super();

    this.images = this.$queryAll('.page img');
    this.renderer = new Renderer();
  }
  public init() {
    this.renderZoomedImage();
    this.registerImageZoom();
  }

  /**
   * @description Registers the image zoom event on all images in the post.
   */
  private registerImageZoom() {
    this.images.forEach((image: HTMLImageElement) => {
      image.style.cursor = "zoom-in";
      image.addEventListener('click', () => this.openImageZoom(image))
    })
  }

  /**
   * @description Opens the image zoom view with the given image.
   * @param {HTMLImageElement} image - The image to zoom in on.
   */
  private openImageZoom(image: HTMLImageElement) {
    this.zoomedImage.src = image.src;
    this.backgroundShade.style.opacity = "1";
    this.$query('html').appendChild(this.backgroundShade)
  }

  /**
   * @description Renders the zoomed in image element and the background shade.
   */
  private renderZoomedImage() {
    this.backgroundShade = this.renderer.$create({
      tag: 'div', options: {
        attributes: {
          style: "background-color: rgba(0, 0, 0, 0.75); cursor: zoom-out; position: fixed; display: flex; align-items: center; justify-content: center; top: 0; right: 0; opacity: 0; transition: all 0.5s; height: 100vh; width: 100vw; overflow: auto; z-index: 9999;"
        },
      }
    })

    this.zoomedImage = this.renderer.$create({
      tag: 'img', options: {
        classList: ['image', 'image--responsive'],
        attributes: {
          style: "max-width: 95vw; height: auto; max-height: 100%;"
        }
      }
    }) as HTMLImageElement;


    this.backgroundShade.append(this.zoomedImage);
    this.backgroundShade.focus();
    this.backgroundShade.addEventListener('click', () => this.backgroundShade.remove())
  }
}
