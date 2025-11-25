
function initVideo() {
    const video = document.querySelector("[data-play-video]");
    const playBtn = document.querySelector("[data-play-icon]");
    if (!video || !playBtn) return;

    const showBtn = () => playBtn.classList.remove("hidden");
    const hideBtn = () => playBtn.classList.add("hidden");

    playBtn.addEventListener("click", () => {
        video.play();
        video.controls = true;
        hideBtn();
    });

    video.addEventListener("play", hideBtn);
    video.addEventListener("pause", () => {
        if (!video.ended) {
            showBtn();
        }
    });
    video.addEventListener("ended", () => {
        showBtn();
        video.controls = false;
        video.currentTime = 0;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initVideo()
})

function initSliders() {
    const sliderGroupItems = document.querySelectorAll('[data-slider-group-item]');
    if (!sliderGroupItems.length) return;

    sliderGroupItems.forEach(sliderItem => {
        const {
            sliderGroupItem,
            spaceBetween,
            spaceBetweenTablet,
            spaceBetweenMobile,
            slidesView,
            slidesViewTablet,
            slidesViewMobile,
            grabCursor,
            autoPlay,
            slidesLoop,
            reverseDirection,
            slidesSpeed,
            paginationClickable,
            slidesDelay,
            paginationType,
            paginationTypeTablet,
            paginationTypeMobile,

        } = sliderItem.dataset;

        const isGrabCursor = grabCursor === 'true';
        const isAutoPlay = autoPlay === 'true';
        const isSlidesLoop = slidesLoop === 'true';
        const isReverseDirection = reverseDirection === 'true';
        const isPaginationClickable = paginationClickable === 'true';

        // Определяем тип пагинации по брейкпоинтам
        const getPaginationType = () => {
            const width = window.innerWidth;
            if (width < 576) return paginationTypeMobile || paginationTypeTablet || paginationType || 'bullets';
            if (width < 992) return paginationTypeTablet || paginationType || 'bullets';
            return paginationType || 'bullets';
        };

        const paginationEl = `#swiper-pagination__${sliderGroupItem}`;




        // Базовая конфигурация
        const swiperConfig = {
            grabCursor: isGrabCursor,
            loop: isSlidesLoop,
            navigation: {
                nextEl: `#toRight_${sliderGroupItem}`,
                prevEl: `#toLeft_${sliderGroupItem}`,
            },
            breakpoints: {
                300: {
                    spaceBetween: parseFloat(spaceBetweenMobile) || 0,
                    slidesPerView: slidesViewMobile === "auto"? 'auto': parseFloat(slidesViewMobile),
                },
                992: {
                    spaceBetween: parseFloat(spaceBetweenTablet) || 0,
                    slidesPerView: slidesViewTablet === "auto"? 'auto': parseFloat(slidesViewTablet),
                },
                1220: {
                    spaceBetween: parseFloat(spaceBetween) || 0,
                    slidesPerView: slidesView === "auto"? 'auto': parseFloat(slidesView),
                },
            },
            pagination: {
                el: paginationEl,
                clickable: isPaginationClickable,
                type: getPaginationType(),
                progressbarFillClass: 'swiper-pagination-progressbar-fill',
                renderProgressbar(progressbarFillClass) {
                    return `<span class="${progressbarFillClass}"></span>`;
                },
            },
            speed: parseInt(slidesSpeed) || 1000,
            autoplay: isAutoPlay ? {
                delay: parseInt(slidesDelay) || 3000,
                reverseDirection: isReverseDirection,
            } : false,
        };

        const swiper = new Swiper(`#${sliderGroupItem}`, swiperConfig);

        // При ресайзе обновляем тип пагинации под устройство
        window.addEventListener('resize', () => {
            const newType = getPaginationType();
            if (swiper.params.pagination.type !== newType) {
                swiper.params.pagination.type = newType;
                swiper.pagination.destroy();
                swiper.pagination.init();
                swiper.pagination.render();
                swiper.pagination.update();
            }
        });
    });
}
initSliders()

document.addEventListener('focus', function (e) {
    if (e.target.matches('input[data-phone-mask]') && typeof Inputmask !== 'undefined') {
        if (!e.target.inputmask) {
            Inputmask({
                mask: "+7 (999) 999-99-99",
                placeholder: "_",
                showMaskOnHover: false,
                clearIncomplete: true
            }).mask(e.target);
        }
    }
}, true);




