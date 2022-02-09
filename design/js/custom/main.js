const navbar = '.navbar';
const navElement = 'nav';

const page = 'html';
const body = 'body';

const heroSection = 'section.hero';
const content = '.content';

const heroBackgrounds = ['./design/img/try ~ 1.jpg', './design/img/try.jpg']

let clientHeight = window.innerHeight,
	clientWidth = window.innerWidth,
	screenHeight = window.outerHeight,
	screenWidth = window.outerWidth,
	prevScrollPos = window.scrollY,
	
	navHeight = $(navbar)[0].offsetHeight,
	
	navRect = $(navbar)[0].getBoundingClientRect(),
	heroContentRect = $(`${heroSection} ${content}`)[0].getBoundingClientRect(),
	randomInt = Math.floor(Math.random() * 2);

alignHeroSection = () => {
	$(heroSection).css({
		height: `calc(100vh)`,
	});
}

toggleNavBackground = () => {
	if ((heroContentRect.top) <= (navRect.bottom - 15))
		$(navbar).addClass('bg-black').removeClass('bg-transparent');
	else
		$(navbar).removeClass('bg-black').addClass('bg-transparent');
}

$('.nav-link').on('click', function (e) {
	const hash = $(this).attr('href')
	if (!$(hash).length)
		e.preventDefault();
});

toggleActiveNavLink = () => {
	$('section').each((idx, element) => {
		let hash = `#${$(element).attr('id')}`;
		
		if ($(hash).length) {
			if (($(element).offset().top < window.pageYOffset + navRect.height) && $(element).offset().top + $(element).height() > window.pageYOffset + 10) {
				if (location.hash !== hash)
					history.pushState({}, '', hash);
			}
			
			if (hash.toLowerCase() === location.hash.toLowerCase()) {
				$('.nav-link').removeClass('active');
				$(`.nav-link[href="${hash}"]`).addClass('active').trigger('click');
			}
		}
	});
}

$(window).on({
	load: function () {
		$('.hero-background').css({
			background: `url("${heroBackgrounds[randomInt]}") center`,
			backgroundSize: 'cover',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			zIndex: 100
		});
	},
	resize: function () {
		clientHeight = window.innerHeight;
		clientWidth = window.innerWidth;
		prevScrollPos = window.scrollY;
		navHeight = $(navbar)[0].offsetHeight;
		navRect = $(navbar)[0].getBoundingClientRect();
		heroContentRect = $(`${heroSection} ${content}`)[0].getBoundingClientRect();
		
		alignHeroSection();
		toggleNavBackground();
	},
	scroll: function () {
		navRect = $(navbar)[0].getBoundingClientRect();
		heroContentRect = $(`${heroSection} ${content}`)[0].getBoundingClientRect();
		
		alignHeroSection();
		toggleNavBackground();
		toggleActiveNavLink();
	}
});

alignHeroSection();
toggleNavBackground();
toggleActiveNavLink();
