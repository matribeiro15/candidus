type ListState = 'feed' | 'grid';
type PostListButton = HTMLButtonElement | HTMLAnchorElement;
interface PostListControlSelectors {
	gridButton: string;
	feedButton: string;
	gridContainer: string;
	feedContainer: string;
}

import Control, { ControlStruct } from '../../core/base/Control';
import UserDevice from '../../core/device/UserDevice';

export default class PostListControl extends Control implements ControlStruct {
	gridButton: PostListButton;
	feedButton: PostListButton;
	gridContainer: HTMLElement;
	feedContainer: HTMLElement;
	activeListState: ListState;
	device: UserDevice;

	constructor({ gridButton, feedButton, gridContainer, feedContainer }: PostListControlSelectors) {
		super(gridButton, feedButton, gridContainer, feedContainer);
		this.gridButton = this.$query(gridButton) as PostListButton;
		this.feedButton = this.$query(feedButton) as PostListButton;
		this.gridContainer = this.$query(gridContainer);
		this.feedContainer = this.$query(feedContainer);
		this.device = new UserDevice();
	}

	/**
	 * @desc Initialize the event listeners for all buttons and apply
	 *       the user preference for the post list
	 */
	public init() {
		if (this.valid) {
			this.gridButton.addEventListener('click', () => this.showGridContainer());
			this.feedButton.addEventListener('click', () => this.showFeedContainer());
			this.initUserListPreference();
			this.initDeviceObserver();
		}
	}

	/**
	 * @desc Subscribe to a device object to get notified whenever the screen
	 *       size changes.
	 */
	private initDeviceObserver() {
		const setFeedOnMobileDevices = (deviceType: DeviceType) => {
			const isSmallerDevice = this.device.getDeviceType() === "mobile-sm" || this.device.getDeviceType() === "mobile-md";
			if (isSmallerDevice) {
				this.showGridContainer();
				this.hideToolbarControls();
			} else {
				this.showToolbarControls();
			}
		};

		setFeedOnMobileDevices(this.getDevice().getDeviceType());
		this.getDevice().addSubscriber(setFeedOnMobileDevices);
	}

	/**
	 * @desc Check if user already has a preferred container. If not, set it to
	 *       grid list type once. Must be called either as part of the constructor
	 *       or the init() method
	 */
	private initUserListPreference() {
		const userListPreference = localStorage.getItem('user-list-preference') as ListState;
		if (!userListPreference) {
			this.showGridContainer();
		} else {
			this.activatePreferredListContainer();
		}
	}

	/**
	 * @desc  Activate the container preference in the user's local storage
	 */
	private activatePreferredListContainer() {
		const userListPreference: ListState = localStorage.getItem('user-list-preference') as ListState;

		if (userListPreference === 'feed') {
			this.showFeedContainer();
		}

		if (userListPreference === 'grid') {
			this.showGridContainer();
		}
	}

	/**
	 * @desc Activate type 'grid' - view for the list container
	 */
	private showGridContainer() {
		this.gridButton.classList.add('active');
		this.gridContainer.classList.remove('hidden');

		this.feedButton.classList.remove('active');
		this.feedContainer.classList.add('hidden');

		this.setActiveListState('grid');
	}

	/**
	 * @desc Activate type 'feed' - view for the list container
	 */
	private showFeedContainer() {
		this.feedButton.classList.add('active');
		this.feedContainer.classList.remove('hidden');

		this.gridButton.classList.remove('active');
		this.gridContainer.classList.add('hidden');

		this.setActiveListState('feed');
	}

	private showToolbarControls() {
		this.gridButton.classList.remove('hidden');
		this.feedButton.classList.remove('hidden');
	}

	private hideToolbarControls() {
		this.gridButton.classList.add('hidden');
		this.feedButton.classList.add('hidden');
	}

	/**
	 * @desc Get the currently active list state `grid` or `feed`
	 */
	private getActiveListState(): ListState {
		return this.activeListState;
	}

	/**
	 * @desc Get the device this module subscribes to
	 * @see {UserDevice}
	 */
	private getDevice() {
		return this.device;
	}
	/**
	 * @desc Set the currently active list state `grid` or `feed`
	 */
	private setActiveListState(state: ListState): void {
		this.activeListState = state;
		localStorage.setItem('user-list-preference', state);
	}
}
