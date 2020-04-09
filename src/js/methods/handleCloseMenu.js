import classNames from '../classNames'

export default ({ menu }) => {
  function onClick(e) {
    const menuEl = e.target.closest(`.${classNames.menu.menu}`)
    const burger = e.target.closest(`.${classNames.menu.burger}`)
    const close = e.target.closest(`.${classNames.menu.close}`)

    if (close) {
      menu.close()
      return
    }

    if (burger || menuEl) return
    menu.close()
  }

  document.addEventListener('click', onClick)
}
