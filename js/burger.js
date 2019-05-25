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
