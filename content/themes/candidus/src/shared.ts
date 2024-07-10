/**
 * Include all controls and styles used throughout the theme
 * Injected in 'default.hbs'
 *
 * Should include stuff like fonts, styles and controls that
 * appead across the theme and are not specific to one site.
 */

declare global {
	interface Window {
		CANDIDUS: InjectedPluginOptions;
		umami: any
	}
}

import { InjectedPluginOptions } from './scripts/core/base/Plugin';
import '@fontsource/oswald';
import '@fontsource/eb-garamond';
import '@fontsource/inconsolata';

import './images/user.png';

import ThemeControl from './scripts/modules/theme/ThemeControl';
import FooterSocialIconsPlugin from './scripts/plugins/FooterSocialIcons';
import SidebarControl from './scripts/modules/sidebar/SidebarControl';

const themeButton = new ThemeControl();
themeButton.init();

const footerSocialIconsPlugin = new FooterSocialIconsPlugin('#footer-social');
const sidebarControl = new SidebarControl({
	toggleButton: '#menubutton',
	sidebarElement: '#sidebar',
});

footerSocialIconsPlugin.init();
sidebarControl.init();
