window.addEventListener('DOMContentLoaded', (e) => {
	e.preventDefault();

	const slider = tns({
		container: '.carousel__inner',
		items: 1,
		slideBy: 'page',
		mouseDrag: true,
		autoplay: false,
		controls: false,
		nav: false,
		navPosition: "bottom",
		responsive: {
			320: {
				nav: true,
				items: 1
			},
			992: {
				nav: false
			}
		}
	});


	document.querySelector('.prev').addEventListener('click', () => {
		slider.goTo('prev');
	});
	document.querySelector('.next').addEventListener('click', () => {
		slider.goTo('next');
	});


	// Tabs

	class ItcTabs {
		constructor(target, config) {
			const defaultConfig = {};
			this._config = Object.assign(defaultConfig, config);
			this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
			this._elButtons = this._elTabs.querySelectorAll('.catalog__tab');
			this._elPanes = this._elTabs.querySelectorAll('.catalog__content');
			this._eventShow = new Event('tab.itc.change');
			this._init();
			this._events();
		}
		_init() {
			this._elTabs.setAttribute('role', 'tablist');
			this._elButtons.forEach((el, index) => {
				el.dataset.index = index;
				el.setAttribute('role', 'tab');
				this._elPanes[index].setAttribute('role', 'tabpanel');
			});
		}
		show(elLinkTarget) {
			const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
			const elLinkActive = this._elTabs.querySelector('.catalog__tab_active');
			const elPaneShow = this._elTabs.querySelector('.catalog__content_show');
			if (elLinkTarget === elLinkActive) {
				return;
			}
			elLinkActive ? elLinkActive.classList.remove('catalog__tab_active') : null;
			elPaneShow ? elPaneShow.classList.remove('catalog__content_show') : null;
			elLinkTarget.classList.add('catalog__tab_active');
			elPaneTarget.classList.add('catalog__content_show');
			this._elTabs.dispatchEvent(this._eventShow);
			elLinkTarget.focus();
		}
		showByIndex(index) {
			const elLinkTarget = this._elButtons[index];
			elLinkTarget ? this.show(elLinkTarget) : null;
		};
		_events() {
			this._elTabs.addEventListener('click', (e) => {
				const target = e.target.closest('.catalog__tab');
				if (target) {
					e.preventDefault();
					this.show(target);
				}
			});
		}
	}
	// инициализация .tabs как табов
	new ItcTabs('.catalog');

	const moreLink = document.querySelectorAll('.catalog-item__more'),
		backLink = document.querySelectorAll('.catalog-item__list_back'),
		itemContet = document.querySelectorAll('.catalog-item__content'),
		itemList = document.querySelectorAll('.catalog-item__list');


	function toggleSlide(change, content, list) {
		change.forEach((item, index) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();

				list[index].classList.toggle('catalog-item__list_active');
				content[index].classList.toggle('catalog-item__content_active');
			});

		});
	}
	toggleSlide(moreLink, itemContet, itemList);
	toggleSlide(backLink, itemContet, itemList);


	const overley = document.querySelector('.overley'),
		consultationForm = document.querySelector('#consultation'),
		orderForm = document.querySelector('#order');

	// Order form show
	function showOrderForm(overley) {
		const orderBtn = document.querySelectorAll('[data-buy = order]'),
			itemName = document.querySelectorAll('.catalog-item__title'),
			modalDescrBuy = document.querySelector('.modal__descr_buy');
		orderBtn.forEach((item, index) => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
				modalDescrBuy.textContent = itemName[index].textContent;
				orderForm.style.display = 'block';
				overley.style.display = 'block';
			});
		});
	}
	showOrderForm(overley);

	// Consultation form show
	function consultationFormShow(overley) {
		const consultationBtn = document.querySelectorAll('[data-modal = consultation]');
		consultationBtn.forEach(item => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
				consultationForm.style.display = 'block';
				overley.style.display = 'block';
			});
		});
	}
	consultationFormShow(overley);

	// close window Form
	function closeForm(form, overley) {
		const modalClose = document.querySelectorAll('.modal__close');
		modalClose.forEach(item => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
				form.style.display = 'none';
				overley.style.display = 'none';
			});
		});
	}

	closeForm(orderForm, overley);
	closeForm(consultationForm, overley);

	// Validation form 
	let consultForm = document.querySelector('#consultation-form'),
		orderFormInp = document.querySelector('#order-form'),
		fitchForm = document.querySelector('#fitch-form'),
		userName = document.querySelector('#username'),
		userPhone = document.querySelector('#userphone'),
		userEmail = document.querySelector('#useremail'),
		usernameOrder = document.querySelector('#ordername'),
		phoneOrder = document.querySelector('#orderphone'),
		emailOrder = document.querySelector('#orderemail'),
		consultUsername = document.querySelector('#consult-username'),
		consultPhone = document.querySelector('#consult-phone'),
		consultEmail = document.querySelector('#consult-email');

	function valid(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			checkOrderForm(usernameOrder, phoneOrder, emailOrder);
			checkOrderForm(userName, userPhone, userEmail);
			checkOrderForm(consultUsername, consultPhone, consultEmail);
		});
	}
	valid(orderFormInp);
	valid(fitchForm);
	valid(consultForm);


	function checkOrderForm(name, phone, email) {
		let usernameValue = name.value.trim(),
			phoneValue = phone.value.trim(),
			emailValue = email.value.trim(),
			regularUsername = /^[a-z]{3,16}$/,
			regularPhone = /^((\+?3)?8)?0\d{9}$/;

		if (usernameValue === "" || !regularUsername.test(usernameValue)) {
			setInvalidForm(name);

		} else {
			setValidForm(name);
		}
		if (phoneValue === "" || !regularPhone.test(phoneValue)) {
			setInvalidForm(phone);

		} else {
			setValidForm(phone);
		}
		if (emailValue === "") {
			setInvalidForm(email);

		} else {
			setValidForm(email);
		}
	}

	function setInvalidForm(input) {
		const formControl = input.parentElement;
		formControl.classList.add('invalid');
		formControl.classList.remove('valid');

	}

	function setValidForm(input) {
		const formControl = input.parentElement;
		formControl.classList.add('valid');
		formControl.classList.remove('invalid');
	}

	const upArrow = document.querySelector('.pageup');

	window.addEventListener('scroll', () => {
		if(window.scrollY > 1600) {
			upArrow.classList.add('pageup__show');
		} else {
			upArrow.classList.remove('pageup__show');
		}

	});


});