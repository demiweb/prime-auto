import { throttle } from 'throttle-debounce'
import classNames from '../classNames'
import { BEMblock } from '../helpers'

export default ({ dom }) => {
  const { layout } = dom
  const header = document.querySelector(`.${classNames.auxHeader}`)
  if (!header) return

  let lastScrollTop = 0

  const scrollHandler = () => {
    const st = window.pageYOffset
    if (st > lastScrollTop) {
      BEMblock(layout, 'out').addMod('double-header')
    } else {
      BEMblock(layout, 'out').removeMod('double-header')
    }

    lastScrollTop = st <= 0 ? 0 : st
  }

  const onScroll = throttle(66, scrollHandler)
  window.addEventListener('scroll', onScroll)
}
