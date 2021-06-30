// Register SW
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
		if (tags.includes('latest-update')) skipDownloadingLatestUpdateOnPageLoad();
	});
});

// Hamburger menu
if (window.innerWidth < 1024) {
	const hamburger = document.querySelector('#hamburger'),
		icon = document.querySelector('#menu-icon'),
		menu = document.querySelector('#menu'),
		tagline = document.querySelector('.tagline'),
		nav = document.querySelector('#nav'),
		bodyOverflow = document.querySelector('body');

	hamburger.addEventListener('click', () => {
		if (menu.style.right === '' || menu.style.right === '-100%') {
			menu.style.right = '0';
			icon.classList.remove('fa-bars');
			icon.classList.add('fa-times');
			icon.style.color = 'red';
			icon.style.transition = 'color 300ms ease-in';
			tagline.style.display = 'none';
			nav.style.borderBottom = '1px solid rgb(169, 137, 152)';
			bodyOverflow.style.overflow = 'hidden';
		} else {
			menu.style.right = '-100%';
			icon.classList.remove('fa-times');
			icon.classList.add('fa-bars');
			icon.style.color = 'unset';
			icon.style.transition = 'color 300ms ease-in';
			tagline.style.display = 'block';
			nav.style.borderBottom = 'none';
			bodyOverflow.style.overflow = 'auto';
		}
	});

	//Outside click
	menu.addEventListener('click', () => {
		menu.style.right = '-100%';
		icon.classList.remove('fa-times');
		icon.classList.add('fa-bars');
		icon.style.color = 'unset';
		tagline.style.display = 'block';
		nav.style.borderBottom = 'none';
		bodyOverflow.style.overflow = 'auto';
	});
}

// Change BG colors of #connect & #navigation to solid ones
window.addEventListener('scroll', () => {
	const nav = document.querySelector('#nav'),
		connect = document.querySelector('#connect'),
		description = document.querySelector('.container');

	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
		nav.style.background = 'rgb(219, 196, 204)';
		connect.style.background = 'white';
		description.style.visibility = 'hidden';
	} else {
		nav.style.background = 'rgba(219, 196, 204, 0.7)';
		connect.style.background = 'none';
		description.style.visibility = 'unset';
	}
});

// js-slidein: Slide-In effect
const slideIns = document.querySelectorAll('.js-slidein');

window.addEventListener('scroll', slideIn);

function slideIn() {
	slideIns.forEach((element) => {
		const triggerBottom = window.innerHeight / 1.1;
		const elementTop = element.getBoundingClientRect().top;

		if (triggerBottom > elementTop) {
			element.classList.add('show');
		} else {
			element.classList.remove('show');
		}
	});
}

slideIn();

// Uncover Showcase BG after 1.5 seconds
setTimeout(() => {
	const showcase = document.querySelector('#showcase');
	showcase.style.background =
		'url(./img/showcase.jpg) no-repeat center center/cover';
	showcase.style.filter = 'unset';
}, 1500);

// Date
const currentYear = document.querySelector('#currentYear');
currentYear.innerText = new Date().getFullYear();
