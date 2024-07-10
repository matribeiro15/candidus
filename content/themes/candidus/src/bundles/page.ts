import PostSocialControl from '../scripts/modules/posts/PostSocialControl';
import PostReadingProgressBarPlugin from '../scripts/plugins/PostReadingProgressBar';
import TextToolbar from '../scripts/modules/text/TextToolbar';
import PostShareControl from '../scripts/modules/posts/PostShareControl';
import SyntaxHighlighter from '../scripts/plugins/SyntaxHighlighter';
import PostCodeToolbarControl from '../scripts/modules/posts/PostCodeToolbarControl';
import PostImageZoomControl from '../scripts/modules/posts/PostImageZoomControl';

const postReadingProgressBarPlugin = new PostReadingProgressBarPlugin({
	postReadingBar: '#post__progressbar',
	postContainer: '#post__container',
});

const postSocialControl = new PostSocialControl({
	postTitle: 'h1',
	postAbstract: '#post__abstract',
	shareButtonFacebook: '#socialbar__button__share--facebook',
	shareButtonTwitter: '#socialbar__button__share--twitter',
	shareButtonReddit: '#socialbar__button__share--reddit',
	shareButtonLinkedin: '#socialbar__button__share--linkedin',
	shareButtonAny: '#socialbar__button__share--any',
});

const textToolbar = new TextToolbar({
	containerSelector: '#post__container',
	markableElementSelectors: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote'],
	popoverSelector: '#marker__menu',
	bookmarkButtonSelector: '#marker__menu--bookmark',
	twitterButtonSelector: '#marker__menu--twitter',
	clipboardButtonSelector: '#marker__menu--clipboard',
});

const postShareControl = new PostShareControl({
	toolbarContainer: "#post__share__container"
})

const syntaxHighlighter = new SyntaxHighlighter({
	stylesheetSelector: "#prism__stylesheet",
	scriptSelector: '#prism__script'
});

const postCodeToolbarControl = new PostCodeToolbarControl({
	containerSelector: 'pre'
})

const postImageZoomControl = new PostImageZoomControl()

postReadingProgressBarPlugin.init();
postSocialControl.init();
textToolbar.init();
postShareControl.init();
syntaxHighlighter.init();
postCodeToolbarControl.init();
postImageZoomControl.init()