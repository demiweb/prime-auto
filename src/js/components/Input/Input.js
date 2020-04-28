export default class Input {
  constructor(className) {
    this.className = className
    this.inputs = []
  }

  getCurrentInputMeta(container) {
    return this.inputs.filter(meta => container === meta.container)[0]
  }

  updateCurrentMeta(container, newData) {
    this.inputs = this.inputs.map(meta =>
      meta.container === container ? { ...meta, ...newData } : meta
    )
  }

  createClearButton(container) {
    const button = document.createElement('button')
    button.className = 'input__btn delete-btn'
    button.type = 'button'
    button.style.display = 'none'
    button.innerHTML = '<span></span>'

    container.appendChild(button)
    this.updateCurrentMeta(container, { clearButton: button })
  }

  createPasswordButton(container) {
    const button = document.createElement('button')
    button.className = 'input__btn'
    button.type = 'button'
    button.innerHTML = `
    <svg viewBox="0 0 512 512" class="icon icon--eye" width="1.000em" height="1em">
      <path d="M508.177 245.995C503.607 240.897 393.682 121 256 121S8.394 240.897 3.823 245.995a15.002 15.002 0 000 20.01C8.394 271.103 118.32 391 256 391s247.606-119.897 252.177-124.995a15.004 15.004 0 000-20.01zM256 361c-57.891 0-105-47.109-105-105s47.109-105 105-105 105 47.109 105 105-47.109 105-105 105z"/>
      <path d="M271 226c0-15.09 7.491-28.365 18.887-36.53C279.661 184.235 268.255 181 256 181c-41.353 0-75 33.647-75 75s33.647 75 75 75c37.024 0 67.668-27.034 73.722-62.358C299.516 278.367 271 255.522 271 226z"/>
    </svg>
    `

    container.appendChild(button)
    this.updateCurrentMeta(container, { passwordButton: button })
  }

  toggleClearButtonVisibility(container) {
    const { input, clearButton } = this.getCurrentInputMeta(container)

    if (input.value.length > 0) {
      clearButton.style.display = ''
    } else {
      clearButton.style.display = 'none'
    }
  }

  changeFileLabelName(container) {
    const { input } = this.getCurrentInputMeta(container)
    const title = container.querySelector('.input__file-title')
    const [file] = input.files
    if (!file || !title) return

    title.innerHTML = file.name
  }

  handleInput(e) {
    const input = e.target
    const container = input.closest(this.className)
    if (!container) return
    const { type } = this.getCurrentInputMeta(container)

    if (type === 'clear-button') this.toggleClearButtonVisibility(container)
    if (type === 'file') this.changeFileLabelName(container)
  }

  handleClick(e) {
    if (!this.inputs.length) return

    const clearButtons = this.inputs.map(meta => meta.clearButton)
    const passwordButtons = this.inputs.map(meta => meta.passwordButton)

    const handleButtonClick = (buttonsArray, callback) => {
      if (!buttonsArray.length) return
      buttonsArray.forEach(button => {
        if (!button || e.target.closest('.input__btn') !== button) return

        e.preventDefault()
        const container = e.target.closest(this.className)
        const { input } = this.getCurrentInputMeta(container)

        callback({ container, input })
      })
    }

    handleButtonClick(clearButtons, ({ container, input }) => {
      this.clearInputField(input)
      this.toggleClearButtonVisibility(container)
    })

    handleButtonClick(passwordButtons, ({ input }) => {
      this.togglePasswordInputType(input)
    })
  }

  clearInputField(input) {
    input.value = ''
  }

  togglePasswordInputType(input) {
    input.type = input.type === 'password' ? 'text' : 'password'
  }

  _initInputs() {
    this.containers.forEach(container => {
      const input = container.querySelector('input')
      const type = container.dataset.input

      const inputMeta = {
        container,
        input,
        type,
        clearButton: null,
        passwordButton: null,
      }

      this.inputs.push(inputMeta)

      if (type === 'clear-button') {
        this.createClearButton(container)

        setTimeout(this.toggleClearButtonVisibility.bind(this, container))
      }

      if (type === 'show-password-button') {
        this.createPasswordButton(container)
      }
    })
  }

  _addListenters() {
    this.onInputHandler = this.handleInput.bind(this)
    this.onClickHandler = this.handleClick.bind(this)

    document.addEventListener('input', this.onInputHandler)
    document.addEventListener('click', this.onClickHandler)
  }

  init() {
    this.containers = [...document.querySelectorAll(this.className)]
    if (!this.containers.length) return

    this._initInputs()
    this._addListenters()
  }
}
