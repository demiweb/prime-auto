import { throttle } from 'throttle-debounce'
import classNames from '../classNames'
import { BEMblock } from '../helpers'

export default ({ dom }) => {
  const { layout } = dom
  const header = document.querySelector(`.${classNames.auxHeader}`)
  if (!header || !window.matchMedia('(min-width: 992px)').matches) return

  const scrollHandler = () => {
    if (window.pageYOffset > 50) {
      BEMblock(layout, 'out').addMod('double-header')
    } else {
      BEMblock(layout, 'out').removeMod('double-header')
    }
  }

  const onScroll = throttle(66, scrollHandler)
  window.addEventListener('scroll', onScroll)
}
