export default class TextClipper {
	paragraphs: NodeListOf<HTMLParagraphElement>;
	characterLimit: number;
	constructor(paragraphs: NodeListOf<HTMLParagraphElement>, characterLimit: number) {
		this.paragraphs = paragraphs;
		this.characterLimit = characterLimit;
	}

	public truncate() {
		this.paragraphs.forEach((paragraph) => {
			const text = paragraph.innerText.trim();
			if (text.length > 0) {
				const newText = text.split(/[\s\r\n]+/g).splice(0, this.characterLimit);
				paragraph.innerText = [...newText, ' ... '].join(' ').trim();
			}
		});
	}
}
