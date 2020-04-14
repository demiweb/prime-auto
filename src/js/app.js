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
import Input from './components/Input/Input'
import Accordion from './components/Accordion/Accordion'
import Tabs from './components/Tabs/Tabs'

class App {
  constructor() {
    this.methods = {}
    this.classNames = classNames
    this.dom = {
      body: document.body,
    }

    this.menu = new Menu({
      classNames: {
        btn: 'burger',
        menu: 'header__nav',
      },
    })
    this.slider = new SLider(`.${classNames.slider.container}`)
    this.input = new Input(`.${classNames.input}`)
    this.accordion = new Accordion({
      classNames: {
        btn: 'catalog-accordion__btn',
        item: 'catalog-accordion__sublist',
      },
    })
    this.tabs = new Tabs({
      classNames: {
        btn: 'tabs__tab',
        item: 'tabs__item',
      },
    })
  }

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
    this.slider.init()
    this.input.init()
    this.accordion.init()
    this.tabs.init()
  }
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
