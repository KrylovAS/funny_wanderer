window.addEventListener('load', startSlider);

function startSlider() {
	function moveToSelected(element) {
		const selected = document.getElementsByClassName('selected')[0];
		const next = document.getElementsByClassName('next')[0];
		const prev = document.getElementsByClassName('prev')[0];

		switch (element) {
			case 'next':
				selected.classList.remove('selected');
				selected.classList.add('prev');
				next.classList.remove('next');
				next.classList.add('selected');
				prev.classList.remove('prev');
				prev.classList.add('next');
				break;
			case 'prev':
				selected.classList.remove('selected');
				selected.classList.add('next');
				next.classList.remove('next');
				next.classList.add('prev');
				prev.classList.remove('prev');
				prev.classList.add('selected');
				break;
		}
		setTimeout(hidden, 1000);

		function hidden() {
			document.getElementById('next').classList.remove('hiddenSlideBtn');
			document.getElementById('prev').classList.remove('hiddenSlideBtn');
		}
	}

	function hideBtn() {
		document.getElementById('next').classList.add('hiddenSlideBtn');
		document.getElementById('prev').classList.add('hiddenSlideBtn');
	}

	document.getElementById('prev').addEventListener('click', () => {
		hideBtn();
		moveToSelected('prev');
	});

	document.getElementById('next').addEventListener('click', () => {
		hideBtn();

		moveToSelected('next');
	});
}

// let a = document.getElementsByClassName('mobile-menu__container')[0];

// let z = document.getElementsByClassName('mobile-menu__item');

// for (let key of z) {
// 	key.addEventListener('click', function() {
// 		a.style = 'height: 0';
// 	});
// }
