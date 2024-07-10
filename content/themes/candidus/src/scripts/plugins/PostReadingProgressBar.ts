import Control, { ControlStruct } from '../core/base/Control';

interface PostLoaderControlSelectors {
	postReadingBar: string;
	postContainer: string;
}

export default class PostReadingProgressBar extends Control implements ControlStruct {
	private postReadingBar: HTMLProgressElement;
	private postContainer: HTMLElement;

	constructor({ postReadingBar, postContainer }: PostLoaderControlSelectors) {
		super(postReadingBar, postContainer);
		this.postReadingBar = this.$query(postReadingBar) as HTMLProgressElement;
		this.postContainer = this.$query(postContainer);
	}

	public init() {
		if (this.valid) {
			this.showProgressBar();
			this.monitorProgressBar();
		}
	}

	private showProgressBar() {
		this.postReadingBar.style.opacity = '1';
	}

	private monitorProgressBar() {
		let frameListening = () => {
			const contentBox = this.postContainer.getBoundingClientRect();
			const midPoint = window.innerHeight / 2;
			if (contentBox.top > midPoint) {
				this.postReadingBar.value = 0;
			}
			if (contentBox.top < midPoint) {
				this.postReadingBar.value = this.postReadingBar.max;
			}
			if (contentBox.top <= midPoint && contentBox.bottom >= midPoint) {
				this.postReadingBar.value =
					(this.postReadingBar.max * Math.abs(contentBox.top - midPoint)) / contentBox.height;
			}
			window.requestAnimationFrame(frameListening);
		};
		window.requestAnimationFrame(frameListening);
	}
}
