import MySlider from './MySlider'
import classes from '../../classNames'

const classNames = classes.slider

export default class SLider {
  constructor(slider) {
    this.sliderClass = slider
    this.sliders = []
  }

  _getOptions() {
    this.getOptions = ({ navigation, onInit, pagination }) => ({
      hero: {
        slidesPerView: 1,
        fadeEffect: { crossFade: true },
        effect: 'fade',
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          waitForTransition: false,
        },
        on: {
          init: onInit,
        },
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true,
        },
      },
      img: {
        navigation,
        slidesPerView: 1,
        on: {
          init: onInit,
        },
      },
      row: {
        slidesPerView: 2,
        loop: true,
        spaceBetween: 15,
        on: {
          init: onInit,
        },
        breakpoints: {
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        },
      },
      gallery: {
        slidesPerView: 1,
        on: {
          init: onInit,
        },
      },
      thumbs: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        on: {
          init: onInit,
        },
        breakpoints: {
          576: {
            slidesPerView: 4,
          },
        },
      },
      testimonials: {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 30,
        on: {
          init: onInit,
        },
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true,
        },
        breakpoints: {
          992: {
            slidesPerView: 2,
            slidesPerColumn: 2,
          },
        },
      },
    })
  }

  _getSliders() {
    this.gallerySliders = this.containers.filter(
      container => container.dataset.slider === 'gallery'
    )
  }

  _initSliders() {
    this.containers.forEach(container => {
      if (container.classList.contains(classNames.plugin.initialized)) return

      const name = container.dataset.slider

      const slider = new MySlider(container, this.getOptions)
      if (name !== 'gallery') slider.init()

      this.sliders = [...this.sliders, slider]
    })

    this.initGallerySliders()
  }

  initGallerySliders() {
    if (!this.gallerySliders.length) return

    this.sliders.forEach(sliderObj => {
      const slider = sliderObj
      if (slider.name === 'gallery') {
        const gallery = slider.container.closest(`.${classes.gallery}`)
        const thumbs = gallery.querySelector(`.${classNames.container}[data-slider="thumbs"]`)
        const [thumbsSlider] = this.sliders.filter(el => el.container === thumbs)

        slider.options.thumbs = {
          swiper: thumbsSlider.swiper,
        }
        slider.init()
      }
    })
  }

  init() {
    this.containers = [...document.querySelectorAll(this.sliderClass)]
    if (!this.containers.length) return

    this._getOptions()
    this._getSliders()
    this._initSliders()
  }
}
