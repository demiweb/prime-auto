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
        slidersPerView: 1,
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
        slidersPerView: 1,
        on: {
          init: onInit,
        },
      },
    })
  }

  _initSliders() {
    this.containers.forEach(container => {
      if (container.classList.contains(classNames.plugin.initialized)) return

      const slider = new MySlider(container, this.getOptions)
      slider.init()
      this.sliders = [...this.sliders, slider]
    })
  }

  init() {
    this.containers = [...document.querySelectorAll(this.sliderClass)]
    if (!this.containers.length) return

    this._getOptions()
    this._initSliders()
  }
}
