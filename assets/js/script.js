'use sctric';

window.addEventListener('DOMContentLoaded', () => {

	// Tabs 

	const tabs = document.querySelectorAll('.slider__item'),
	      tabsContent = document.querySelectorAll('.slider__content'),
		  tabsParent = document.querySelector('.slider');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('slider__item-active');
		});
	};

	function showTabContent (i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
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

	const message = {
		loading: 'assets/images/forms/spinner.svg',
		success: 'Thanks! We will contact you soon',
        failure: 'Something went wrong...'
	};

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;

			form.insertAdjacentElement('afterbegin', statusMessage);

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
					showThxModal(message.success);
					form.reset();
					statusMessage.remove();
				} else {
					statusMessage.remove();
					showThxModal(message.failure);
				}
			});
		});
	}

	postData(form);

	function showThxModal (message) {
		const modal = document.querySelector('.modal');
		modal.classList.toggle('show');

        modal.innerHTML = `
            <div class="modal__content">
                <div class="modal__title">${message}</div>
            </div>
        `;

		setTimeout(() => {
			modal.classList.toggle('show');
		}, 2000);
	}
});