import { ControlStruct } from '../core/base/Control';
import PluginBase, { SocialAccount, InjectedPluginOptions } from '../core/base/Plugin';

enum ElementSelectorName {
	socialUList = 'socialUList',
}

type ElementSelectorMap = Record<ElementSelectorName, HTMLElement>;

export default class FooterSocialIconsPlugin extends PluginBase implements ControlStruct {
	private socialUList;

	constructor(socialUList: string) {
		super(socialUList);
		this.socialUList = this.$query(socialUList);
	}

	public init() {
		this.renderAdditionalSocialAccounts();
	}

	private renderAdditionalSocialAccounts() {
		if (this.hasPluginOption('SOCIAL_ACCOUNTS')) {
			(this.getPluginOption('SOCIAL_ACCOUNTS') as SocialAccount[]).forEach((account) => {
				this.socialUList.append(this.renderSocialListItem(account));
			});
		}
	}

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
