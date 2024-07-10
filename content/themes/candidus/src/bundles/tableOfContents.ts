import PostPageControl from '../scripts/modules/posts/PostPageControl';

import '../style/modules/dropdown/index.scss';

const postPageControl = new PostPageControl({
	tableOfContentsHeader: '#toc__header',
	tableOfContentsContainer: '#toc__container',
	tableOfContentsToggle: '#toc__toggle',
	navbarContainer: '#navbar__container',
	postContainer: '#post__container',
});

postPageControl.init();
