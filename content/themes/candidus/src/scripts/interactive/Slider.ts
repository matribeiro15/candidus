// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import { SwiperOptions } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SwiperCustomizing {
	swiperNextArrow: HTMLElement;
	swiperPreviousArrow: HTMLElement;
}

/**
 * Class that handles slider.js. Primarily used on the index page
 * featured posts
 */
export default class FeaturedPostSlider {
	swiperContainerSelector: string;
	swiperInstance: Swiper;
	swiperOptions: SwiperOptions;
	constructor(swiperContainerSelector: string) {
		this.swiperContainerSelector = swiperContainerSelector;
		this.swiperOptions = {
			modules: [Navigation, Pagination, Autoplay],
			loop: true,
			effect: 'creative',
			grabCursor: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				bulletClass: 'postbanner__bullet',
				bulletActiveClass: 'postbanner__bullet--active',
				renderBullet: function (index: number, className: string) {
					return `<div class="${className}"></div>`;
				},
			},
		};
	}

	public init() {
		this.swiperInstance = new Swiper(this.swiperContainerSelector, this.swiperOptions);
	}
}
