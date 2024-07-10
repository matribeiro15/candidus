
import PostListControl from '../scripts/modules/posts/PostListControl';
import PostLoaderControl from '../scripts/modules/posts/PostLoaderControl';

const postListControl = new PostListControl({
	gridButton: '#grid__button',
	feedButton: '#feed__button',
	gridContainer: '#post__container',
	feedContainer: '#feed__container',
});

const postLoaderControl = new PostLoaderControl({
	loadMoreButton: '#read-more__button',
	postContainer: '#post__container',
	feedContainer: '#feed__container',
});

postListControl.init();
postLoaderControl.init();