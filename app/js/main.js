/* Get date */

function getZero(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}

function getDate(selector) {
  if (selector === '.num') {
    const day = new Date().getDate();
    document.querySelector('.num').textContent = day;
  }
  if (selector === '.month') {
    const month = new Date().getMonth() + 1;
    document.querySelector('.month').textContent = getZero(month);
  }
  if (selector === '.year') {
    const year = new Date().getFullYear();
    document.querySelector('.year').textContent = year;
  }
}

getDate('.num');
getDate('.month');
getDate('.year');

/* Slider */

function sliderCarousel(container, dots) {
  const sliderContainer = document.querySelector(container);
  const slider = sliderContainer.querySelector('.slider');
  const sliderBtnPrev = sliderContainer.querySelector('.slider-arrow__prev');
  const sliderBtnNext = sliderContainer.querySelector('.slider-arrow__next');
  const sliderDotsItems = sliderContainer.querySelectorAll('.dots-item');

  let counterDots = 0;
  
  function showSlider(direction) {
    const sliderItems = slider.querySelectorAll('.slider-item');
    if (direction === 'next') slider.appendChild(sliderItems[0]);
    if (direction === 'prev') slider.prepend(sliderItems[sliderItems.length - 1]);
  }

  if (dots) {
    sliderDotsItems[0].classList.add('active');

    function dotActive() {
      sliderDotsItems.forEach((dot) => {
        dot.classList.remove('active');
      });
      sliderDotsItems[counterDots].classList.add('active');
    }
  }
  
  sliderBtnNext.addEventListener('click', () => {
    showSlider('next');
    if (dots) {
      counterDots < sliderDotsItems.length - 1 ? counterDots++ : counterDots = 0;
      dotActive();
    }
  });
  
  sliderBtnPrev.addEventListener('click', () => { 
    showSlider('prev');
    if(dots) {
      counterDots <= 0 ? counterDots = sliderDotsItems.length - 1 : counterDots--;
      dotActive();
    }
  });
};

sliderCarousel('.header', true);
sliderCarousel('.travel', false);
sliderCarousel('.sleep', false);

//slider=========================================

function slider(container) {
  const sliderContainer = document.querySelector(container);
  const slideWrapper = sliderContainer.querySelector('.surf__slider-container');
  const slider = sliderContainer.querySelector('.slider');
  const sliderItems = slider.querySelectorAll('.slider-item');
  const sliderBtnPrev = sliderContainer.querySelector('.slider-arrow__prev');
  const sliderBtnNext = sliderContainer.querySelector('.slider-arrow__next');
  const sliderDotsItems = sliderContainer.querySelectorAll('.dots-item');
  const coords = sliderContainer.querySelector('.surf__map-coordinates');

  itemsInfo = {
    offset: 0,
    elementWidth: 350,
    position: {
      min: 0,
      max: sliderItems.length - 1,
      current: 0
    }
  };
  sliderDotsItems[itemsInfo.position.current].classList.add('active');
  sliderItems[itemsInfo.position.current].classList.add('active');

  function showDot() {
    sliderDotsItems.forEach(dot => {
      dot.classList.remove('active');
    });
    sliderDotsItems[itemsInfo.position.current].classList.add('active');
    coords.textContent = sliderDotsItems[itemsInfo.position.current].dataset.coords;
  }

  sliderDotsItems.forEach(dot => {
    dot.addEventListener('click', () => {
      itemsInfo.position.current = +dot.dataset.dot;
      showDot();
      showSlider();
    });
  });

  function showSlider() {
    const {position, elementWidth, offset} = itemsInfo;

    slideWrapper.style.transform = `translateX(-${position.current * (elementWidth + offset)}px)`;
    sliderItems.forEach(slider => {
      slider.classList.remove('active');
    });
    sliderItems[position.current].classList.add('active');
  }

  sliderBtnNext.addEventListener('click', () => {
    const {position} = itemsInfo;
    position.current > position.max - 1 ? position.current = position.min : position.current++;
    // showSlider('next');
    showSlider();
    showDot();
  });
  sliderBtnPrev.addEventListener('click', () => {
    const {position} = itemsInfo;
    console.log(position.current)
    position.current <= position.min ?  position.current = position.max : position.current--;
    // showSlider('prev');
    showSlider();
    showDot();
  });
}

slider('.surf');


// Custom input

function customInput(container) {
  const containerEl = document.querySelector(container);
  const sumValue = containerEl.querySelectorAll('.sum');
  const btnUp = containerEl.querySelectorAll('.quantity-up');
  const btnDown = containerEl.querySelectorAll('.quantity-down');
  const nights = containerEl.querySelectorAll('.nights');
  const guests = containerEl.querySelectorAll('.guests');

  const perNight = 55;
  const perGuest = 25;
  const min = 1;
  const max = 9;
  let guestValue = 4;
  let nightValue = 3;
  let sum = 0


  function init() {
    nights.forEach(night => {
      night.value = nightValue;
    });
  
    guests.forEach(guest => {
      guest.value = guestValue;
    });
  
    sum = nightValue * perNight + guestValue * perGuest;
    sumValue.forEach(elSum => {
      elSum.textContent = sum;
    });
  }

  init();
  
  function calculate() {
    sum = nightValue * perNight + guestValue * perGuest;
    sumValue.forEach(elSum => {
      elSum.textContent = sum;
    });
  }

  function renderNights() {
    nights.forEach(night => {
      night.value = nightValue;
    });
  }

  function renderGuests() {
    guests.forEach(guest => {
      guest.value = guestValue;
    });
  }

  function checkInputClass(input) {
    const inputParent = input.parentNode.closest('div.quantity');
    const inputClass = inputParent.querySelector('input').classList[0];
    return inputClass;
  }

  function incrValue(classIn) {
    if (classIn === 'nights') {
      nightValue >= max ? nightValue = max : ++nightValue;
      renderNights();
    }
    if (classIn === 'guests') {
      guestValue >= max ? guestValue = max : ++guestValue;
      renderGuests();
    }
    calculate();
  }

  function decrValue(classIn) {
    if (classIn === 'nights') {
      nightValue <= min ? nightValue = min : --nightValue;
      renderNights();
    }
    if (classIn === 'guests') {
      guestValue <= min ? guestValue = min : --guestValue;
      renderGuests();
    }
    calculate();
  }

  btnUp.forEach(btn => {
    btn.addEventListener('click', e => {
      const classInput = checkInputClass(e.target);
      incrValue(classInput);
    });
  });

  btnDown.forEach(btn => {
    btn.addEventListener('click', e => {
      const classInput = checkInputClass(e.target);
      decrValue(classInput);
    });
  });
}

customInput('.sleep');

// Surfboard

function showDesc() {
  const circles = document.querySelectorAll('.surfboard__box-circle');
  circles.forEach(circle => {
    circle.addEventListener('click', () => {
      circle.classList.toggle('minus');
    });
  });
}

showDesc();

// Animation to scroll

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      return;
    }
    //remove animation  
    // entry.target.classList.remove('animate');
  });
});

// Get multiple elements instead of a single one using "querySelectorAll"
const squares = document.querySelectorAll('.anim');

// Loop over the elements and add each one to the observer
squares.forEach((element) => observer.observe(element));

/* Mobile menu */

// const menuBtn = document.querySelector('.burger-menu-btn');
// const headerSection = document.querySelector('.header');

// menuBtn.addEventListener('click', () => {
//   headerSection.classList.toggle('menu--open');
// });

/* feedback slider */

// const feedbackSlider = new Swiper('.feedback__slider', {
 
//   loop: true,

//   // pagination
//   pagination: {
//     el: '.swiper-pagination',
//   }
// });

/* certificate slider */

// const certificateSlider = new Swiper('.certificate__slider', {
 
//   loop: true,
//   slidesPerView: 1,
//   spaceBetween: 20,
//   breakpoints: {
//     441: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     591: {
//       slidesPerView: 3,
//       spaceBetween: 20,
//     }
//   },
//   // pagination
//   pagination: {
//     el: '.swiper-pagination',
//   }
// });

/* accordeon */

// const accordeon = document.querySelector('.accordeon');
// const accordeonTitles = accordeon.querySelectorAll('.accordeon__title');

// accordeonTitles.forEach.call(accordeonTitles, function(accordeonTitle) {
//   accordeonTitle.addEventListener('click', function(){
//     const currentText = accordeonTitle.parentElement.querySelector('.accordeon__text');

//     accordeonTitle.classList.toggle('accordeon__title--active')
//     currentText.classList.toggle('accordeon__text--expand');

//     if (currentText.classList.contains('accordeon__text--expand')) {
//       currentText.style.maxHeight = currentText.scrollHeight + 'px';
//     } else {
//       currentText.style.maxHeight = 0;
//     }
//   });
// });

/* smooth scroling */

// const allLinks = document.querySelectorAll('a:link');

// allLinks.forEach(function(link) {
// 	link.addEventListener('click', function (e) {
// 		e.preventDefault();
// 		const href = link.getAttribute('href');
// 		// Scroll to top
// 		if (href === '#') {
// 			window.scrollTo({
// 				top: 0,
// 				behavior: 'smooth'
// 			});
// 		}
// 		// Scroll to other links
// 		if (href !== '#' && href.startsWith('#')) {
// 			const sectionEl = document.querySelector(href);
// 			sectionEl.scrollIntoView({
// 				behavior: 'smooth'
// 			});
// 		}

// 		// Close mobile menu after click on menu link
// 		if (link.classList.contains('menu-link')) {
// 			headerSection.classList.toggle('menu--open');
// 		}
// 	});
// });
