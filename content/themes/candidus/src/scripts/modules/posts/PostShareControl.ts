import Control, { ControlStruct } from '../../core/base/Control';
import UserDevice from '../../core/device/UserDevice';

interface PostShareControlSelectors {
  toolbarContainer: string;
}

export default class PostShareControl extends Control implements ControlStruct {
  toolbarContainer: HTMLElement;
  device: UserDevice;

  constructor({ toolbarContainer }: PostShareControlSelectors) {
    super(toolbarContainer);
    this.toolbarContainer = this.$query(toolbarContainer);
    this.device = new UserDevice()
  }

  init(): void {
    // TODO: Possible optimisation - remove subscribers when device type changes
    const isSmallerDevice = this.device.getDeviceType() === "mobile-sm"
      || this.device.getDeviceType() === "mobile-sm"
      || this.device.getDeviceType() === "tablet-sm";
    if (this.valid && isSmallerDevice) {
      this.device.addSubscriber(this.toggleToolbarContainer)
    }
  }

  private toggleToolbarContainer = () => {
    if (this.device.lastScrollDirection === "down") {
      this.toolbarContainer.classList.add('toolbar--responsive--hidden');
    } else {
      this.toolbarContainer.classList.remove('toolbar--responsive--hidden')
    }
  }
}