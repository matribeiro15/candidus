import { ControlStruct } from '../core/base/Control';
import PluginBase, { SocialAccount, InjectedPluginOptions } from '../core/base/Plugin';

enum ElementSelectorName {
	socialUList = 'socialUList',
}

type ElementSelectorMap = Record<ElementSelectorName, HTMLElement>;

/**
 * Plugin that renders additional social media icons in the footer.
 * If the site author has configured additional social media accounts
 * through the `SOCIAL_ACCOUNTS` option, this plugin will render them as
 * list items in the footer.
 *
 * @class FooterSocialIconsPlugin
 * @extends PluginBase
 * @implements ControlStruct
 */
export default class FooterSocialIconsPlugin extends PluginBase implements ControlStruct {
	/**
	 * The <ul> element in the footer that contains the social media icons.
	 *
	 * @private
	 * @type {HTMLElement}
	 */
	private socialUList;

	/**
	 * Constructor.
	 *
	 * @param {string} socialUList The CSS selector for the <ul> element that contains the social media icons.
	 */
	constructor(socialUList: string) {
		super(socialUList);
		this.socialUList = this.$query(socialUList);
	}

	/**
	 * Initialize the plugin.
	 */
	public init() {
		this.renderAdditionalSocialAccounts();
	}

	/**
	 * Renders additional social media icons if the site author has configured them.
	 *
	 * @private
	 */
	private renderAdditionalSocialAccounts() {
		if (this.hasPluginOption('SOCIAL_ACCOUNTS')) {
			(this.getPluginOption('SOCIAL_ACCOUNTS') as SocialAccount[]).forEach((account) => {
				this.socialUList.append(this.renderSocialListItem(account));
			});
		}
	}

	/**
	 * Renders a single social media icon as a <li> element.
	 *
	 * @private
	 * @param {SocialAccount} socialAccount The configuration for a single social media account.
	 * @returns {HTMLElement} A <li> element containing the social media icon.
	 */
	private renderSocialListItem(socialAccount: SocialAccount) {
		const listElement = document.createElement('li');
		const linkElement = document.createElement('a');
		const spanElement = document.createElement('span');
		const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');

		listElement.classList.add('footer__listitem', 'my-1');

		linkElement.title = socialAccount.title;
		linkElement.target = '_blank';
		linkElement.href = socialAccount.url;
		linkElement.setAttribute('data-umami-event', `follow-${socialAccount.title}`);

		spanElement.innerText = socialAccount.title;

		svgElement.classList.add('mr-1');
		svgElement.setAttribute('height', '18px');
		svgElement.setAttribute('width', '18px');
		svgElement.setAttribute('role', 'img');
		svgElement.setAttribute('aria-label', socialAccount.slug);

		useElement.classList.add('icon');
		useElement.setAttribute('href', `#${socialAccount.slug}`);

		svgElement.appendChild(useElement);
		linkElement.appendChild(svgElement);
		linkElement.appendChild(spanElement);
		listElement.appendChild(linkElement);

		return listElement;
	}
}

