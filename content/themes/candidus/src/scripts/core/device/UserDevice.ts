import { defaultBreakpointMap, defaultObserverConfig } from './resources';
import Observer from '../base/Observer';

export default class UserDevice extends Observer {
  deviceType: DeviceType;
  screenWidth: number;
  deviceScreenBreakpointConfig: DeviceScreenBreakpointMap[];
  resizingObserverConfig: ResizingObserverConfig;
  currentScrollHeight: number;
  previousScrollHeight: number;
  lastScrollDirection: "up" | "down"
  constructor() {
    super();
    this.deviceScreenBreakpointConfig = defaultBreakpointMap;
    this.resizingObserverConfig = defaultObserverConfig;
    this.subscribers = [];
    this.currentScrollHeight = 0;
    this.previousScrollHeight = 0;
    this.lastScrollDirection = "down"
    this.initUserDeviceType();
    this.listenForScreenSizeChanges();
    this.listenForScrollHeightChanges()
  }

  /**
   * @desc    Get the currently active device type based on the screen width
   * @returns `mobile`, `tablet` or `desktop`
   */
  public getDeviceType(): DeviceType {
    return this.deviceType;
  }

  /**
   * @desc    Get the width of the current device
   */
  public getScreenWidth(): number {
    return this.screenWidth;
  }

  /**
   * @desc    Set the width and the mapped device of this class once
   */
  private initUserDeviceType() {
    this.handleBrowserWindowResizing();
  }

  /**
   * @desc    Monitor changes of the screen size. This method
   *          adjusts properties `deviceType` and `screenWidth`
   */
  private listenForScreenSizeChanges() {
    window.addEventListener('resize', () => {
      this.setIsResizing(true);
    });

    setInterval(() => {
      if (this.getIsResizing() === true) {
        this.handleBrowserWindowResizing();
        this.notifySubscribersAboutDeviceType();
        this.setIsResizing(false);
      }
    }, this.getResizingCheckInterval());
  }

  /**
   * @desc Check whenever the user scrolls up or down the current page.
   *       Sets the inner value of `lastScrollDirection` of this device
   *       instance.
   */
  private listenForScrollHeightChanges() {
    window.addEventListener('scroll', (ev) => {
      this.setIsScrolling(true);
    })
    setInterval(() => {
      if (this.getIsScrolling() === true) {
        this.handleScrollDirectionAction();
        this.notifySubscribersAboutScrollDirection();
        this.setIsScrolling(false);
      }
    }, this.getResizingCheckInterval());
  }

  /**
   * @desc    Set the device type and the browser width dynamically
   */
  private handleBrowserWindowResizing() {
    const browserWindowWidth = this.getBrowserWindowWidth();
    const deviceType = this.selectDeviceTypeByBrowserScreenWidth(browserWindowWidth);
    this.setScreenWidth(browserWindowWidth);
    this.setDeviceType(deviceType);
  }

  private handleScrollDirectionAction() {
    this.previousScrollHeight = this.getBodyScrollHeight();
    this.lastScrollDirection = this.previousScrollHeight < this.currentScrollHeight ? "up" : "down";

    setInterval(() => {
      this.currentScrollHeight = this.getBodyScrollHeight();
    }, this.getResizingCheckInterval())
  }

  private notifySubscribersAboutDeviceType() {
    const device = this.getDeviceType();
    this.notifySubscribers(device);
  }

  private notifySubscribersAboutScrollDirection() {
    const lastScrollDirection = this.lastScrollDirection;
    this.notifySubscribers(lastScrollDirection);
  }

  /**
   * @desc    Iterate through all registered devices and device which one
   *          matches the current browser window size
   *
   * @example
   * const device = this.selectDeviceTypeByBrowserScreenWidth(500)
   * console.log(device) // => 'mobile'
   */
  private selectDeviceTypeByBrowserScreenWidth(width: number): DeviceType {
    const match = this.deviceScreenBreakpointConfig.find((deviceMap) => {
      return deviceMap.breakpoint.max >= width && deviceMap.breakpoint.min < width;
    });
    return match.device;
  }

  // Private getters & setters for props
  private setIsResizing(value: boolean) {
    this.resizingObserverConfig.isResizing = value;
  }

  private getIsResizing(): boolean {
    return this.resizingObserverConfig.isResizing;
  }

  private setIsScrolling(value: boolean) {
    this.resizingObserverConfig.isScrolling = value;
  }

  private getIsScrolling(): boolean {
    return this.resizingObserverConfig.isScrolling;
  }

  private getResizingCheckInterval(): number {
    return this.resizingObserverConfig.checkInterval;
  }

  private getBrowserWindowWidth(): number {
    return window.innerWidth;
  }

  private getBodyScrollHeight(): number {
    return Math.abs(document.querySelector('body').getBoundingClientRect().top);
  }

  private setDeviceType(type: DeviceType) {
    this.deviceType = type;
  }

  private setScreenWidth(size: number) {
    this.screenWidth = size;
  }
}
