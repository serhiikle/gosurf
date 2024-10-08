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

function sliderCarousel(container) {
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

    // if (container === '.surf') {
    //   sliderItems.forEach(item => {
    //     item.classList.remove('active');
    //   });
    //   sliderItems[1].classList.add('active');
    // }
  }
  
  sliderDotsItems[0].classList.add('active');
  
  function dotActive() {
    sliderDotsItems.forEach((dot) => {
      dot.classList.remove('active');
    });
    sliderDotsItems[counterDots].classList.add('active');
  }
  
  sliderBtnNext.addEventListener('click', () => {
    showSlider('next');
    counterDots < sliderDotsItems.length - 1 ? counterDots++ : counterDots = 0;
    dotActive();
  });
  
  sliderBtnPrev.addEventListener('click', () => { 
    showSlider('prev');
    counterDots <= 0 ? counterDots = sliderDotsItems.length - 1 : counterDots--;
    dotActive();
  });
};

sliderCarousel('.header');

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

  // function showDots() {
  //   const {position} = itemsInfo;
  //   sliderDotsItems.forEach(dot => {
  //     dot.addEventListener('click', () => {
  //       position.current = +dot.dataset.dot;
  //       dot.classList.remove('active');
  //       console.log(position.current)
  //       showSlider();
  //       sliderDotsItems[position.current].classList.add('active');
  //     });
  //   });
  //   console.log(position.current);
    
  // }

  // showDots()

  function showSlider() {
    const {position, elementWidth, offset} = itemsInfo;

    slideWrapper.style.transform = `translateX(-${position.current * (elementWidth + offset)}px)`;
    sliderItems.forEach(slider => {
      slider.classList.remove('active');
    });
    sliderItems[position.current].classList.add('active');
  }

  // function showSlider(direction) {
  //   const {position, elementWidth, offset} = itemsInfo;

  //   if(direction === 'next') {
  //     slideWrapper.style.transform = `translateX(-${position.current * (elementWidth + offset)}px)`;
  //     sliderItems.forEach(slider => {
  //       slider.classList.remove('active');
  //     });
  //     sliderItems[position.current].classList.add('active');
  //   } else if(direction === 'prev') {
  //     slideWrapper.style.transform = `translateX(-${position.current * (elementWidth + offset)}px)`;
  //     sliderItems.forEach(slider => {
  //       slider.classList.remove('active');
  //     });
  //     sliderItems[position.current].classList.add('active');
  //   } else {
  //     slideWrapper.style.transform = `translateX(-${position.current * (elementWidth + offset)}px)`;
  //   }
  // }

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

/*
const slider = (function(){
	
	//const
  const sliderContainer = document.querySelector('.surf');
	const slider = document.querySelector('.slider');
  const sliderBtnPrev = sliderContainer.querySelector('.slider-arrow__prev');
  const sliderBtnNext = sliderContainer.querySelector('.slider-arrow__next');
  const sliderDotsItems = sliderContainer.querySelectorAll('.dots-item');
  const sliderItems = sliderContainer.querySelectorAll('.slider-item');
	const elements = document.querySelectorAll(".slider-content__item"); // обертка для слайда

  console.log(sliderContainer);
  console.log(slider);
  console.log(sliderBtnPrev);
  console.log(sliderBtnNext);
  console.log(sliderDotsItems);
  console.log(sliderItems);
	
	// data
	const itemsInfo = {
		offset: 0, // смещение контейнера со слайдами относительно начальной точки (первый слайд)
		position: {
			current: 0, // номер текущего слайда
			min: 0, // первый слайд
			max: sliderItems.length - 1 // последний слайд	
		},

		update: function(value) {
			this.position.current = value;
			this.offset = -value;
		},
		reset: function() {
			this.position.current = 0;
			this.offset = 0;
		}	
	};

	const controlsInfo = {
		prevButtonDisabled: true,
		nextButtonDisabled: false
	};

	// Инициализация слайдера
	function init(props) {
		let {position, offset} = itemsInfo;
		
		// Проверка наличия элементов разметки
		if (sliderContainer && slider && sliderBtnPrev && sliderBtnNext && sliderDotsItems && sliderItems) {
			if (props && props.currentItem) {
				if (parseInt(props.currentItem) >= position.min && parseInt(props.currentItem) <= position.max ) {
					position.current = props.currentItem;
					offset = - props.currentItem;	
				}
      }
			
			_updateControlsInfo();
			_createControls();
			_render();	
		} else {
			console.log("Разметка слайдера задана неверно. Проверьте наличие всех необходимых классов 'slider/slider-content/slider-wrapper/slider-content__item'");
		}
	}

	// Обновить свойства контролов
	function _updateControlsInfo() {
		const {current, min, max} = itemsInfo.position;
		controlsInfo.prevButtonDisabled = current > min ? false : true;
		controlsInfo.nextButtonDisabled = current < max ? false : true;
	}

	// Создание элементов разметки
	function _createControls() {
    
		createArrows();
		createDots();

		function createArrows() {
			sliderBtnPrev.addEventListener("click", () => updateItemsInfo(itemsInfo.position.current - 1))
			sliderBtnNext.addEventListener("click", () => updateItemsInfo(itemsInfo.position.current + 1))
		}

		function createDots() {		
			sliderDotsItems.forEach((dot, i) => {
        dot.addEventListener("click", function() {
					updateItemsInfo(i);
				});
      });
		}
	}

	// Задать класс для контролов (buttons, arrows)
	function setClass(options) {
		if (options) {
			options.forEach(({element, className, disabled}) => {
				if (element) {
					disabled ? element.classList.add(className) : element.classList.remove(className)	
				} else {
					console.log("Error: function setClass(): element = ", element);
				}
			})
		}
	}

	// Обновить значения слайдера
	function updateItemsInfo(value) {
		itemsInfo.update(value);
		_slideItem(true);	
	}

	// Отобразить элементы
	function _render() {
		const {prevButtonDisabled, nextButtonDisabled} = controlsInfo;
		let controlsArray = [
			{element: sliderBtnNext, className: "d-none", disabled: prevButtonDisabled},
			{element: sliderBtnPrev, className: "d-none", disabled: nextButtonDisabled}
		];
		
		// Отображаем/скрываем контроллы
		setClass(controlsArray);

		// Передвигаем слайдер
		slider.style.transform = `translateX(${itemsInfo.offset*100}%)`;	
		
		// Задаем активный элемент для точек (dot)
		if (controlsInfo.dotsEnabled) {
			if (document.querySelector(".dot--active")) {
				document.querySelector(".dot--active").classList.remove("dot--active");	
			}
			dotsWrapper.children[itemsInfo.position.current].classList.add("dot--active");
		}
	}

	// Переместить слайд
	function _slideItem() {
		_updateControlsInfo();
		_render();
	}

	// Доступные методы
	return {init};
}())

slider.init({
	currentItem: 0,
});

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
