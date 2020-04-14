import classNames from '../classNames'

const HAS_OPEN_DROPDOWN = 'has-open-dropdown'

export default () => {
  function onClick(e) {
    if (window.matchMedia('(min-width: 992px)').matches) return

    const wrap = e.target.closest(`.${classNames.dropdown}`)
    if (!wrap) return

    if (e.target.tagName === 'A' && e.target.parentNode !== wrap) return

    e.preventDefault()

    const dropdown = wrap.querySelector('ul')

    if (wrap.classList.contains(HAS_OPEN_DROPDOWN)) {
      wrap.classList.remove(HAS_OPEN_DROPDOWN)
      dropdown.style.maxHeight = ''
    } else {
      wrap.classList.add(HAS_OPEN_DROPDOWN)
      dropdown.style.maxHeight = `${dropdown.scrollHeight}px`
    }
  }

  document.addEventListener('click', onClick)
}
