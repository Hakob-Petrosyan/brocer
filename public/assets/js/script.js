
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
function initTabs() {
    document.querySelectorAll('[data-tabs-block]').forEach(tabsBlock => {
        const panes = tabsBlock.querySelectorAll('[data-panes] [data-pane]');
        const containers = tabsBlock.querySelectorAll('[data-container]');
        panes.forEach((pane, index) => {
            pane.addEventListener('click', () => {
                panes.forEach(item => item.classList.remove('active'));
                containers.forEach(container => container.classList.remove('active'));
                pane.classList.add('active');
                containers[index].classList.add('active');
            });

            if (panes.length > 0 && containers.length > 0) {
                panes[0].classList.add('active');
                containers[0].classList.add('active');
            }
        });
    });
}
function openCloseBlock() {
    const openBlockBtn = document.querySelectorAll('[data-open-block-btn]');
    openBlockBtn.forEach(openBtn => {
        openBtn?.addEventListener('click', (event) => {
            const openBlockWrapper = event.target.closest('[data-open-block-wrapper]');
            const openingBlock = openBlockWrapper.querySelector('[data-open-block]');
            const hasChangeText = openBtn.hasAttribute('data-change-btn-text');

            openBlockWrapper.classList.toggle('open');
            if (openingBlock.style.maxHeight) {
                openingBlock.removeAttribute('style');
                if (hasChangeText) {
                    openBtn.textContent = 'Показать еще';
                }
            } else {
                openingBlock.style.maxHeight = openingBlock.scrollHeight + 'px';
                if (hasChangeText) {
                    openBtn.textContent = 'Скрыть';
                }
            }
        })
    })
}

function stopScrollBody() {
    const popupOverlay = document.getElementById('popupOverlay');
    document.body.classList.add('popup-open');
    popupOverlay.classList.add('active');
    popupOverlay.focus();
}
function resetScrollBody() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.remove('active');
    document.body.classList.remove('popup-open');
}
function closePopUp(){
    const popup = document.querySelector('[data-popup]');
    popup.classList.remove('active');
    resetScrollBody()
}
function openPopUp() {
    const openPopupButtons = document.querySelectorAll('[data-open-popup]');
    openPopupButtons.forEach(openBtn => {
        openBtn.addEventListener('click', () => {
            const popupType = openBtn.dataset.openPopup;
            const currentPopUp = document.getElementById(`${popupType}`)
            currentPopUp.classList.add('active');
            currentPopUp.querySelector('[data-popup-get-title]').innerText = openBtn.dataset.popupSetTitle;
            currentPopUp.querySelector('[data-popup-get-button-text]').innerText = openBtn.dataset.popupSetTitle;
            stopScrollBody()
        });
    })

    const closePopupBtn = document.querySelectorAll('[data-close-popup]');
    closePopupBtn.forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const popup = e.target.closest('[data-popup]');
            popup.classList.remove('active');
            resetScrollBody()
        })
    })
}
function closeByESC() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape'){
            closePopUp()
        }
    });
}
function closeByOverlay() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay?.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopUp()
        }
    });
}

function initFancybox(){
    Fancybox.bind("[data-fancybox='certificates-gallery']", {
        Thumbs: {
            autoStart: true,
        },
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initVideo()
    initTabs()
    openCloseBlock()
    openPopUp()
    closeByESC()
    closeByOverlay()
    initFancybox()
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





