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
function stopScrollBody(mobileMenu) {
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
    const popups = document.querySelectorAll('[data-popup]');
    popups.forEach(popup => {
        popup.classList.remove('active');
    })
    resetPopupReviews()
    resetScrollBody()
}
function openPopUp() {
    const openPopupButtons = document.querySelectorAll('[data-open-popup]');
    openPopupButtons.forEach(openBtn => {
        openBtn.addEventListener('click', () => {
            const popupType = openBtn.dataset.openPopup;
            const currentPopUp = document.getElementById(`${popupType}`)
            currentPopUp.classList.add('active');


            const popupGetTitle = currentPopUp.querySelector('[data-popup-get-title]');
            const popupGetButtonText = currentPopUp.querySelector('[data-popup-get-button-text]');

            if (popupGetTitle){
                popupGetTitle.innerText = openBtn.dataset.popupSetTitle;
                popupGetButtonText.innerText = openBtn.dataset.popupSetTitle;
            }


            stopScrollBody()
            closeAllMenu()
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
function showFullReviewsButton(){
    const reviewsCards = document.querySelectorAll('[data-reviews-card]');
    reviewsCards.forEach(reviewsCard => {
        const reviewsContent = reviewsCard.querySelector('[data-set-reviews-content]')
        const reviewsToggleFull = reviewsCard.querySelector('[data-reviews-toggle-full]')

        if (reviewsContent.scrollHeight < 150){
            reviewsToggleFull.classList.add('hide');
        }

    })
}
function resetPopupReviews(){
    const popUpReviewsCard = document.querySelector("[data-popUp-reviews-card]");

    const creatorImgWrap = popUpReviewsCard.querySelector('[data-get-reviews-creator-img]');
    if (creatorImgWrap) creatorImgWrap.innerHTML = '';

    const reviewsSiteImage = popUpReviewsCard.querySelector('[data-get-reviews-site-image]');
    if(reviewsSiteImage) reviewsSiteImage.innerHTML = '';

    popUpReviewsCard.querySelector('[data-get-reviews-creator-data]').innerText = '';
    popUpReviewsCard.querySelector('[data-get-reviews-creator-name]').innerText = '';

    const ratingEl = popUpReviewsCard.querySelector('[data-get-reviews-rating]');
    ratingEl.className = ratingEl.className.replace(/stars-\d/, '');

    popUpReviewsCard.querySelector('[data-get-reviews-content]').innerHTML = '';
}
function createImageReviews(wrapper, src, alt){
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    wrapper.appendChild(img);
}
function initFullReviews(){
    const fullReviewsButtons = document.querySelectorAll('[data-reviews-toggle-full]');
    fullReviewsButtons.forEach(button => {
        button.addEventListener('click', () => {
            resetPopupReviews()

            const reviewsCard = button.closest('[data-reviews-card]');
            const setReviewsCreatorData =  reviewsCard.querySelector('[data-set-reviews-creator-data]').innerHTML;
            const setReviewsCreatorName =  reviewsCard.querySelector('[data-set-reviews-creator-name]').innerHTML;
            const setReviewsRating =  reviewsCard.querySelector('[data-set-reviews-rating]').dataset.setReviewsRating;
            const setReviewsContent =  reviewsCard.querySelector('[data-set-reviews-content]').innerHTML;

            const popUpReviewsCard = document.querySelector("[data-popUp-reviews-card]");
            popUpReviewsCard.querySelector('[data-get-reviews-creator-data]').innerText = setReviewsCreatorData;
            popUpReviewsCard.querySelector('[data-get-reviews-creator-name]').innerText = setReviewsCreatorName;
            popUpReviewsCard.querySelector('[data-get-reviews-rating]').classList.add(setReviewsRating);
            popUpReviewsCard.querySelector('[data-get-reviews-content]').innerHTML = setReviewsContent;

            const reviewsCreatorImg =  reviewsCard.querySelector('[data-set-reviews-creator-img]');
            if (reviewsCreatorImg){
                createImageReviews(
                    popUpReviewsCard.querySelector('[data-get-reviews-creator-img]'),
                    reviewsCreatorImg.dataset.setReviewsCreatorImg,
                    'Фото создателя'
                )
            }

            const setReviewsSiteImage =  reviewsCard.querySelector('[data-set-reviews-site-image]');
            if (reviewsCreatorImg){
                createImageReviews(
                    popUpReviewsCard.querySelector('[data-get-reviews-site-image]'),
                    setReviewsSiteImage.dataset.setReviewsSiteImage,
                    'фото стороннего сайта'
                )
            }

            stopScrollBody()
        })
    })
}
function inputRanger(){
    const rangeWrappers = document.querySelectorAll('[data-range-wrapper]');

    function updateRangeProgress(range, rangeProgress) {
        const value = range.value;
        const min = parseInt(range.min);
        const max = parseInt(range.max);
        const percentage = ((value - min) / (max - min)) * 100;

        rangeProgress.style.width = percentage + "%";
    }

    rangeWrappers?.forEach(rangeWrapper => {
        const input = rangeWrapper.querySelector('[data-range-value]');
        const range = rangeWrapper.querySelector('[data-range-track]');
        const minVal = parseInt(range.min);
        const maxVal = parseInt(range.max);

        const rangeProgress = document.createElement('span');
        rangeProgress.className = 'range-progress';
        range.parentElement.appendChild(rangeProgress);

        updateRangeProgress(range, rangeProgress);

        range.addEventListener('input', () => {
            input.value = String(range.value);
            updateRangeProgress(range, rangeProgress);
        });

        input.addEventListener('input', () => {
            let digits = input.value;
            let num = parseInt(digits);
            if (isNaN(num)) num = minVal;
            if (num < minVal) num = minVal;
            if (num > maxVal) num = maxVal;

            input.value = String(num);
            range.value = num;
            updateRangeProgress(range, rangeProgress);
        });
    });
}
function backwardsTime() {
    const buttons = document.querySelectorAll('[data-backwards-time-buttons]');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const wrapper = button.closest('[data-backwards-time-wrapper]');
            const display = wrapper.querySelector('[data-backwards-time-value]');

            if (!display) return;

            const [m, s] = display.textContent.split(':').map(Number);

            let totalSeconds = m * 60 + s;

            if (totalSeconds <= 1) return;

            clearInterval(display._timerId);

            display._timerId = setInterval(() => {
                totalSeconds--;

                if (totalSeconds <= 1) {
                    totalSeconds = 1;
                    clearInterval(display._timerId);
                }

                const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
                const seconds = (totalSeconds % 60).toString().padStart(2, '0');

                display.textContent = `${minutes}:${seconds}`;
            }, 1000);
        });
    });
}





function initMenu(menuOverlay, menu, button){
    menu.classList.add('open');
    menuOverlay.classList.add('active');
    button.classList.add('active');
}
function closeByMenuOverlay() {
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay?.addEventListener('click', (event) => {
        if (event.target === menuOverlay) {
            closeAllMenu();
        }
    });
}
function closeAllMenu() {
    const allMenus = document.querySelectorAll('[data-close-menu]');
    const menuButtons = document.querySelectorAll('[data-menu-button]');
    const menuOverlay = document.getElementById('menu-overlay');

    allMenus.forEach(menu => menu.classList.remove('open'));
    menuButtons.forEach(button => button.classList.remove('active'));
    menuOverlay?.classList.remove('active');
}
function handleMenuClick(){
    const menuButtons = document.querySelectorAll('[data-menu-button]');
    const menuOverlay = document.getElementById('menu-overlay');

    if (menuButtons.length === 0) return;

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const menuType = button.dataset.menuButton;
            const menu = document.getElementById(menuType);
            if (button.classList.contains('active')){
                closeAllMenu()
            }else{
                closeAllMenu()
                initMenu(menuOverlay, menu, button);
            }
        })
    })
}







document.addEventListener('DOMContentLoaded', function() {
    initVideo()
    initTabs()
    openCloseBlock()
    openPopUp()
    closeByESC()
    closeByOverlay()
    initFancybox()
    showFullReviewsButton()
    initFullReviews()
    inputRanger()
    backwardsTime()
    handleMenuClick()
    closeByMenuOverlay()
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

        const getPaginationType = () => {
            const width = window.innerWidth;
            if (width < 576) return paginationTypeMobile || paginationTypeTablet || paginationType || 'bullets';
            if (width < 992) return paginationTypeTablet || paginationType || 'bullets';
            return paginationType || 'bullets';
        };

        const paginationEl = `#swiper-pagination__${sliderGroupItem}`;

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









