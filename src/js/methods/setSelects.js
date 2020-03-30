import Select from 'select-custom'
import classNames from '../classNames'

export default () => {
  const selects = [...document.querySelectorAll(`.${classNames.select}`)]
  if (!selects.length) return

  selects.forEach(sel => {
    const select = new Select(sel)
    select.init()
  })
}
