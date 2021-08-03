// Register SW
(function registerSW() {
	if ('serviceWorker' in navigator) {
		// register him
		navigator.serviceWorker
			.register('/sw.js', {
				updateViaCache: 'none',
				scope: '/',
			})
			.then(() => {
				// finished registering
			})
			.catch((err) => {
				console.warn('Failed to register', err.message);
			});

		// listen for messages
		navigator.serviceWorker.addEventListener('message', ({ data }) => {
			// received a message from the service worker
			console.log(data, 'New message from your service worker.');
		});
	}

	// SYNC
	async function registerPeriodicCheck() {
		const registration = await navigator.serviceWorker.ready;
		try {
			await registration.periodicSync.register('latest-update', {
				minInterval: 24 * 60 * 60 * 1000,
			});
		} catch {
			console.log('Periodic sync could not be registered!');
		}
	}

	navigator.serviceWorker.ready.then((registration) => {
		registration.periodicSync.getTags().then((tags) => {
			if (tags.includes('latest-update'))
				skipDownloadingLatestUpdateOnPageLoad();
		});
	});
})();

// Hamburger menu
(function menu() {
	if (window.innerWidth < 1024) {
		const hamburger = document.querySelector('#hamburger'),
			icon = document.querySelector('#menu-icon'),
			menu = document.querySelector('.menu'),
			tagline = document.querySelector('.tagline'),
			nav = document.querySelector('#nav'),
			bodyOverflow = document.querySelector('body');

		hamburger.addEventListener('click', () => {
			if (menu.style.display === 'none' || menu.style.display === '') {
				setTimeout(() => {
					menu.style.display = 'flex';
					menu.style.flexFlow = 'column nowrap';
					menu.style.justifyContent = 'center';
					menu.style.alignItems = 'center';
					menu.style.animation = 'slideIn 300ms ease-in';
				}, 1);
				icon.classList.remove('fa-bars');
				icon.classList.add('fa-times');
				icon.style.transition = 'color 300ms ease-in';
				tagline.style.display = 'none';
				nav.style.borderBottom = '1px solid rgb(169, 137, 152)';
				bodyOverflow.style.overflow = 'hidden';
			} else {
				slideOut();
			}
		});

		//Outside click
		menu.addEventListener('click', () => {
			slideOut();
		});

		function slideOut() {
			menu.style.animation = 'slideOut 350ms ease-in';
			setTimeout(() => {
				menu.style.display = 'none';
			}, 300);
			icon.classList.remove('fa-times');
			icon.classList.add('fa-bars');
			tagline.style.display = 'block';
			nav.style.borderBottom = 'none';
			bodyOverflow.style.overflow = 'auto';
		}
	}
})();

// Change BG colors of #connect & #navigation to solid ones
(function changeColors() {
	window.addEventListener('scroll', () => {
		const nav = document.querySelector('#nav'),
			connect = document.querySelector('#connect'),
			description = document.querySelector('.container');

		if (
			document.body.scrollTop > 50 ||
			document.documentElement.scrollTop > 50
		) {
			nav.style.background = 'rgb(219, 196, 204)';
			connect.style.background = 'white';
			description.style.visibility = 'hidden';
		} else {
			nav.style.background = 'rgba(219, 196, 204, 0.7)';
			connect.style.background = 'none';
			description.style.visibility = 'unset';
		}
	});
})();

// js-slidein: Slide-In effect
(function slideIn() {
	window.addEventListener('scroll', () => {
		const slideIns = document.querySelectorAll('.js-slidein');
		slideIns.forEach((element) => {
			const triggerBottom = window.innerHeight / 1.1;
			const elementTop = element.getBoundingClientRect().top;

			if (triggerBottom > elementTop) {
				element.classList.add('show');
			} else {
				element.classList.remove('show');
			}
		});
	});
})();

// Date
(function currentDate() {
	const currentYear = document.querySelector('#currentYear');
	currentYear.innerText = new Date().getFullYear();
})();
