
import { EVENT_CHANGE_THEME, CANDIDUS_PRISM_PLACEHOLDER, CANDIDUS_SYNTAX_HIGHLIGHTER } from '../consts';
import { CandidusThemeEvent } from '../modules/theme/ThemeControl';
import { ControlStruct } from '../core/base/Control';
import PluginBase, { SyntaxHighlighterConfiguration } from '../core/base/Plugin';


interface SyntaxHighlighterSelectors {
  stylesheetSelector: string;
  scriptSelector: string;
}

export default class SyntaxHighlighter extends PluginBase implements ControlStruct {

  constructor({ stylesheetSelector, scriptSelector }: SyntaxHighlighterSelectors) {
    super(stylesheetSelector);
    this.stylesheet = this.$query(stylesheetSelector) as HTMLLinkElement;
    this.script = this.$query(scriptSelector) as HTMLScriptElement;
  }

  public init() {
    if (this.hasPluginOption(CANDIDUS_SYNTAX_HIGHLIGHTER)) {
      const options = this.getPluginOption(CANDIDUS_SYNTAX_HIGHLIGHTER) as SyntaxHighlighterConfiguration;
      this.registerSyntaxHighlighter(options);
      this.listenToThemeChanges(options);
    }
  }

  private registerSyntaxHighlighter(options: SyntaxHighlighterConfiguration) {
    const currentTheme = this.getTheme(options);
    this.$log(`Loading theme stylesheet for ${options.type}-${currentTheme}.css`)
    const path = `${this.stylesheet.dataset['thirdparty_root'].replace(CANDIDUS_PRISM_PLACEHOLDER, `${options.type}-${currentTheme}.css`)}`
    this.script.src = this.script.dataset['src'];
    this.stylesheet.setAttribute('href', path);
    this.stylesheet.dataset['thirdparty_root'] = null;
  }

  private listenToThemeChanges(options: SyntaxHighlighterConfiguration) {
    window.addEventListener(EVENT_CHANGE_THEME, (ev: CandidusThemeEvent) => {
      const oldTheme = ev.detail.theme === "dark-theme" ? 'light' : 'dark';
      const newTheme = ev.detail.theme === "dark-theme" ? 'dark' : 'light';
      const updatedPath = this.stylesheet.getAttribute('href').replace(oldTheme, newTheme);

      this.$log(`Changing theme from ${oldTheme} to ${newTheme} after user preference`)
      this.stylesheet.setAttribute('href', updatedPath);
    })
  }

  private getTheme(options: SyntaxHighlighterConfiguration) {
    return this.$query('html').classList.contains('light-theme') ? 'light' : 'dark';
  }
}
