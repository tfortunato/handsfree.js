global.XMLHttpRequest = function () {
  this.open = jest.fn()
  this.send = () => {
    this.onload()
    this.onprogress({loaded: 100, total: 100})
  }
}