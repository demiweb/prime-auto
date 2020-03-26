import classNames from '../classNames'
import { _UID } from '../helpers'

export default () => {
  const ratingEls = [...document.querySelectorAll(`.${classNames.rating}`)]
  if (!ratingEls.length) return

  ratingEls.forEach(rating => {
    const inputs = [...rating.querySelectorAll('.rating__input')]
    const labels = [...rating.querySelectorAll('.rating__label')]

    if (!inputs.length || !labels.length || inputs.length !== labels.length) return
    const name = `rating-${_UID()}`

    inputs.forEach((input, i) => {
      const id = _UID()

      input.id = id
      input.name = name
      labels[i].setAttribute('for', id)
    })
  })
}
