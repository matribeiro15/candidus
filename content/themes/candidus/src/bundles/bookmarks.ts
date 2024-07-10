import BookmarkListControl from '../scripts/interactive/BookmarkListControl';

import '../style/modules/dropdown/index.scss';

const bookmarkListControl = new BookmarkListControl({
	navbarContainerSelector: '#navbar__container',
	bookmarkListToggleSelector: '#bookmark__dropdown__toggle',
	bookmarkListSelector: '#bookmark__dropdown__drawer',
	bookmarkPlaceholderSelector: '#bookmark__placeholder',
});

bookmarkListControl.init();
