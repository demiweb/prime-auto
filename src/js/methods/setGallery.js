import 'lightgallery.js'
import 'lg-video.js'
import classNames from '../classNames'

export default () => {
  function initGalleries() {
    const lgs = [...document.querySelectorAll(`.${classNames.lightgallery.gallery}`)]

    if (!lgs.length) return

    lgs.forEach(lg => {
      // eslint-disable-next-line
      lightGallery(lg)
    })
  }

  function initTriggerGallery() {
    const onClick = e => {
      const btn = e.target.closest(`.${classNames.lightgallery.trigger}`)
      if (!btn) return
      e.preventDefault()

      const { image } = btn.dataset

      if (!image) return

      // eslint-disable-next-line
      lightGallery(btn, {
        dynamic: true,
        dynamicEl: [{ src: image }],
        counter: false,
      })
    }

    document.addEventListener('click', onClick)
  }

  initGalleries()
  initTriggerGallery()
}
