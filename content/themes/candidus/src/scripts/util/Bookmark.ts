import { BOOKMARK_KEY, CANDIDUS_BOOKMARK_EVENT } from '../consts';

export interface BookmarkStruct {
	path: string;
	node: string;
	title: string;
	text: string;
}

export function getLocalBookmarks(): BookmarkStruct[] {
	return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || [];
}

function setLocalBookmarks(bookmarks: BookmarkStruct[]): void {
	window.dispatchEvent(
		new CustomEvent(CANDIDUS_BOOKMARK_EVENT, {
			detail: bookmarks,
		})
	);
	return localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
}

export function saveLocalBookmark(bookmark: BookmarkStruct) {
	const savedBookmarks: BookmarkStruct[] = getLocalBookmarks();
	const isAlreadyBookmarked: boolean =
		savedBookmarks.findIndex((item) => {
			return item.node === bookmark.node && item.path === bookmark.path;
		}) > -1;

	if (isAlreadyBookmarked) {
		return;
	}

	setLocalBookmarks([...savedBookmarks, bookmark]);
}

export function deleteLocalBookmark(bookmark: Pick<BookmarkStruct, 'node' | 'path'>): void {
	setLocalBookmarks(
		getLocalBookmarks().filter((savedBookmark: BookmarkStruct) => {
			return !(savedBookmark.node === bookmark.node && savedBookmark.path === bookmark.path);
		})
	);
}
