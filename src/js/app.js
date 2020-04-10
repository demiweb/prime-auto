// import regeneratorRuntime from 'regenerator-runtime'

import loadPolyfills from './polyfills/loadPolyfills'
import classNames from './classNames'
import sayHello from './lib/sayHello'
import setHTMLClassNames from './methods/setHTMLClassNames'
import setLazy from './methods/setLazy'
import addRatingIds from './methods/addRatingIds'
import setSelects from './methods/setSelects'
import handleCloseMenu from './methods/handleCloseMenu'
import setPopups from './methods/setPopups'
import handleMenuDropdown from './methods/handleMenuDropdown'
import setGallery from './methods/setGallery'

import { isModernBrowser, setVhProperty } from './helpers'

import SLider from './components/Slider/Slider'
import Menu from './components/Menu/Menu'

// import { NO_SCROLL } from './constants'

class App {
  constructor() {
    this.methods = {}
    this.classNames = classNames
    this.dom = {
      body: document.body,
    }
    // this.state = {
    //   hasMenuOpen: false,
    // }

    this.menu = new Menu({
      classNames: {
        btn: 'burger',
        menu: 'header__nav',
      },
    })
    this.slider = new SLider(`.${classNames.slider.container}`)
  }

  // updateState(state) {
  //   this.state = {
  //     ...this.state,
  //     ...state,
  //   }
  // }

  initMethods() {
    this.methods = {
      sayHello,
      setHTMLClassNames,
      setLazy,
      setVhProperty,
      addRatingIds,
      setSelects,
      handleCloseMenu,
      setPopups,
      handleMenuDropdown,
      setGallery,
    }

    Object.values(this.methods).forEach(fn => fn(this))
  }

  init() {
    this.initMethods()

    this.menu.init()
    // this.menu.onToggle = this.onMenuToggle.bind(this)
    // this.menu.onClose = this.onMenuClose.bind(this)

    this.slider.init()
  }

  // onMenuToggle() {
  //   let { hasMenuOpen } = { ...this.state }
  //   hasMenuOpen = !hasMenuOpen
  //   this.updateState({ hasMenuOpen })

  //   App.toggleScroll(this, this.state.hasMenuOpen)
  // }

  // onMenuClose() {
  //   this.updateState({ hasMenuOpen: false })
  //   App.toggleScroll(this, this.state.hasMenuOpen)
  // }

  // static preventScroll(app) {
  //   app.dom.body.classList.add(NO_SCROLL)
  // }

  // static allowScroll(app) {
  //   app.dom.body.classList.remove(NO_SCROLL)
  // }

  // static toggleScroll(app, condition) {
  //   if (condition) {
  //     App.preventScroll(app)
  //   } else {
  //     App.allowScroll(app)
  //   }
  // }
}

const init = () => {
  const app = new App()
  app.init()
  window.app = app
}

if (isModernBrowser) {
  document.addEventListener('DOMContentLoaded', init)
} else {
  document.addEventListener('DOMContentLoaded', loadPolyfills.bind(null, init))
}
