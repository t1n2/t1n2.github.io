'use sctric';

window.addEventListener('DOMContentLoaded', () => {

	// Tabs 

	const tabs = document.querySelectorAll('.slider__item'),
	      tabsContent = document.querySelectorAll('.slider__content'),
		  tabsParent = document.querySelector('.slider');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('slider__hide');
			item.classList.remove('slider__show', 'slider__fade');
		});

		tabs.forEach(item => {
			item.classList.remove('slider__item-active');
		});
	};

	function showTabContent (i = 0) {
		tabsContent[i].classList.add('slider__show', 'slider__fade');
		tabsContent[i].classList.remove('slider__hide');
		tabs[i].classList.add('slider__item-active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('slider__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				};
			});
		};
	});

	// Form Sign-UP

	const form = document.querySelector('.sign-up');

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const request = new XMLHttpRequest();
			request.open('POST', 'assets/server.php');

			request.setRequestHeader('Content-type', 'application/json');
			const formData = new FormData(form);

			const object = {};
			formData.forEach(function (value, key) {
				object[key] = value;
			});

			const json = JSON.stringify(object);

			request.send(json);

			request.addEventListener('load', ()=> {
				if (request.status === 200) {
					console.log(request.response);
					form.reset();
				} else {
					console.log('error');
				}
			});
		});
	}

	postData(form);
});