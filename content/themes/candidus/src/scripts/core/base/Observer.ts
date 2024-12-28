
/**
 * Base class to collect subscriber functions and call them with
 * a predefined payload
 */
export default class Observer {
  subscribers: Function[];
  constructor() {
    this.subscribers = [];
  }

  /**
   * @desc    Add a new subscriber. A funciton that is subscribed to UserDevice
   *          will be executed whenever the screesize changes and receive the newly
   *          calculated device type as a callback argument.
   */
  public addSubscriber(handler: Function) {
    this.subscribers.push(handler);
  }

  /**
   * @desc    Whenever the screen size changes, notify all subscribers
   *          about the new device type.
   */
  public notifySubscribers(payload: unknown) {
    this.subscribers.forEach((subscriber) => subscriber(payload));
  }
}
