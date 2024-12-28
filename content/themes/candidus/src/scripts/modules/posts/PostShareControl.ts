import Control, { ControlStruct } from '../../core/base/Control';
import UserDevice from '../../core/device/UserDevice';

interface PostShareControlSelectors {
  toolbarContainer: string;
}

/**
 * @class PostShareControl
 * @extends Control
 * @implements ControlStruct
 * @description Manages the visibility of the toolbar container based on device type and scroll direction.
 */
export default class PostShareControl extends Control implements ControlStruct {
  toolbarContainer: HTMLElement;
  device: UserDevice;

  /**
   * @constructor
   * @param {PostShareControlSelectors} param0 - The selectors for toolbar container.
   */
  constructor({ toolbarContainer }: PostShareControlSelectors) {
    super(toolbarContainer);
    this.toolbarContainer = this.$query(toolbarContainer);
    this.device = new UserDevice()
  }

  /**
   * @desc Initialize the control and subscribe to device changes if on a smaller device.
   */
  init(): void {
    const isSmallerDevice = this.device.getDeviceType() === "mobile-sm"
      || this.device.getDeviceType() === "mobile-md"
      || this.device.getDeviceType() === "tablet-sm";
    if (this.valid && isSmallerDevice) {
      this.device.addSubscriber(this.toggleToolbarContainer)
    }
  }

  /**
   * @desc Toggle the visibility of the toolbar container based on the scroll direction.
   * @private
   */
  private toggleToolbarContainer = () => {
    if (this.device.lastScrollDirection === "down") {
      this.toolbarContainer.classList.add('toolbar--responsive--hidden');
    } else {
      this.toolbarContainer.classList.remove('toolbar--responsive--hidden')
    }
  }
}
