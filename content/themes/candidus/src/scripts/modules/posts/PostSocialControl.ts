import Control, { ControlStruct } from '../../core/base/Control';

type SocialPostElement =
	| 'postTitle'
	| 'postAbstract'
	| 'shareButtonFacebook'
	| 'shareButtonTwitter'
	| 'shareButtonLinkedin'
	| 'shareButtonReddit'
	| 'shareButtonAny';

export default class PostSocialControl extends Control implements ControlStruct {
	private windowOptions = 'menubar=no,status=no,height=750,width=500';
	private postTitle: HTMLElement;
	private postAbstract: HTMLElement | null;
	private shareButtonFacebook: HTMLElement;
	private shareButtonTwitter: HTMLElement;
	private shareButtonLinkedin: HTMLElement;
	private shareButtonReddit: HTMLElement;
	private shareButtonAny: HTMLElement;

	constructor({
		postTitle,
		postAbstract,
		shareButtonFacebook,
		shareButtonTwitter,
		shareButtonReddit,
		shareButtonLinkedin,
		shareButtonAny,
	}: Record<SocialPostElement, string>) {
		super(
			postTitle,
			shareButtonAny,
			shareButtonFacebook,
			shareButtonLinkedin,
			shareButtonReddit,
			shareButtonLinkedin
		);
		this.postTitle = this.$query(postTitle);
		this.postAbstract = this.$query(postAbstract);
		this.shareButtonFacebook = this.$query(shareButtonFacebook);
		this.shareButtonTwitter = this.$query(shareButtonTwitter);
		this.shareButtonReddit = this.$query(shareButtonReddit);
		this.shareButtonLinkedin = this.$query(shareButtonLinkedin);
		this.shareButtonAny = this.$query(shareButtonAny);
	}

	async init() {
		if (this.valid) {
			this.initFacebookButton();
			this.initTwitterButton();
			this.initRedditButton();
			this.initLinkedinButton();
			this.initOrHideShareButtonAny();
		}
	}

	private initFacebookButton() {
		this.shareButtonFacebook.addEventListener('click', () => this.shareToFacebook());
	}

	private initTwitterButton() {
		this.shareButtonTwitter.addEventListener('click', () => this.shareToTwitter());
	}

	private initRedditButton() {
		this.shareButtonReddit.addEventListener('click', () => this.shareToReddit());
	}

	private initLinkedinButton() {
		this.shareButtonLinkedin.addEventListener('click', () => this.shareToLinkedin());
	}

	private initOrHideShareButtonAny() {
		if (navigator.share) {
			this.shareButtonAny.addEventListener('click', () => this.shareToAny());
		} else {
			this.shareButtonAny.remove();
		}
	}

	private shareToFacebook() {
		window.open(
			`https://www.facebook.com/sharer.php?u=${window.location.href}`,
			'_blank',
			this.windowOptions
		);
	}

	private shareToTwitter() {
		window.open(
			`
			https://twitter.com/intent/tweet?text=Read "${this.postTitle?.innerHTML}" at&url=${window.location.href}&`,
			'_blank',
			this.windowOptions
		);
	}

	private shareToReddit() {
		window.open(
			`https://www.reddit.com/submit?url=${window.location.href}&title=${this.postTitle?.innerHTML}`,
			'_blank',
			this.windowOptions
		);
	}

	private shareToLinkedin() {
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
			'_blank',
			this.windowOptions
		);
	}

	private shareToAny() {
		navigator.share({
			title: this.postTitle?.innerText,
			text: this.postAbstract?.innerText || '',
			url: window.location.href,
		});
	}
}
