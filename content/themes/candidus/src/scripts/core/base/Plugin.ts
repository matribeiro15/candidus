import Control from './Control';

export type PluginOption = 'SOCIAL_ACCOUNTS' | 'HOMEPAGE_ANNOUCEMENT_BAR' | "SYNTAX_HIGHLIGHTER";

export interface SocialAccount {
	title: string;
	slug: string;
	url: string;
}

export interface HomepageAnnoucementBarConfiguration {
	html: string;
	barColor?: 'theme' | 'primary' | 'secondary';
	contentColor?: string;
	textColor?: string;
	remainClosed: 'never' | 'day' | 'week' | 'always';
}

export interface SyntaxHighlighterConfiguration {
	type: "prism",
	theme?: "light" | "dark"

}

export interface InjectedPluginOptions {
	SOCIAL_ACCOUNTS: SocialAccount[];
	HOMEPAGE_ANNOUCEMENT_BAR: HomepageAnnoucementBarConfiguration;
	SYNTAX_HIGHLIGHTER: SyntaxHighlighterConfiguration
}

/**
 * Base class for all plugins. Plugins are using the window.CANDIDUS
 * object and are primarily used for third-party libraries that were
 * not installed using NPM
 */
export default class PluginBase extends Control {
	public injected: boolean = false;
	public candidus: InjectedPluginOptions;
	public stylesheet?: HTMLLinkElement;
	public script?: HTMLScriptElement;

	constructor(...elements: string[]) {
		super(...elements);
		if (this.checkForInjectedPlugin()) {
			this.injected = true;
			this.candidus = window.CANDIDUS;
		}
	}

	public checkForInjectedPlugin(): boolean {
		return !!window.CANDIDUS;
	}

	public hasPluginOption(pluginOption: PluginOption): boolean {
		if (this.injected) {
			return !!this.candidus[pluginOption];
		}
		return false;
	}

	public getPluginOption(pluginOption: PluginOption) {
		if (this.injected) {
			return this.candidus[pluginOption];
		}
	}
}
