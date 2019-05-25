'use strict';

window.addEventListener('load', changeMenu);

function changeMenu() {
	let menuLinks = document.getElementsByClassName('mobile-menu__link');

	for (let link of menuLinks) {
		link.addEventListener('click', (e) => {
			document.getElementsByClassName('mobile-menu__checkbox')[0].checked = false;
		});
	}
}
//плавный скрол
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();

		const blockID = anchor.getAttribute('href');

		document.querySelector('' + blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	});
}
