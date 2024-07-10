export interface RendererHTMLElement {
	tag: keyof HTMLElementTagNameMap;
	options: {
		classList?: string[];
		innerText?: string;
		innerHTML?: string;
		attributes?: Record<string, string>;
	};
	children?: RendererHTMLElement[];
}

export interface RendererXMLElement extends RendererHTMLElement {
	namespace: string;
}

export default class Renderer {
	$create({ tag, options, children }: RendererHTMLElement) {
		const element = document.createElement(tag);
		element.classList.add(...options.classList);
		if (options.innerText) element.innerText = options.innerText;
		if (options.innerHTML) element.innerHTML = options.innerHTML;
		if (options.attributes && Object.keys(options.attributes).length > 0) {
			for (let attribute in options.attributes) {
				element.setAttribute(attribute, options.attributes[attribute]);
			}
		}
		if (children && children.length > 0) {
			children.forEach((child) => element.append(this.$create(child)));
		}
		return element;
	}
}
