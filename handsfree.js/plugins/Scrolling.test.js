const plugin = require('./Scrolling')
const faces = [{
  cursor: {
    x: 0,
    y: -10
  }
}]

describe('Plugin: Scrolling', () => {
  it('scrolls the page vertically', () => {
    const handsfree = new Handsfree()
    let scrollTo = 1000
    handsfree._injectCursor()
    handsfree._use(plugin)
  
    // Scroll up
    document.body.style.height = '10000px'
    window.scrollTo(0, scrollTo)
    handsfree._onFrameHooks(faces)
    expect(window.scrollY).toBe(scrollTo + faces[0].cursor.y * handsfree.plugin.Scrolling.scrollSpeed)

    // Scroll down
    faces[0].cursor.y = window.innerHeight + 1
    window.scrollTo(0, 0)
    handsfree._onFrameHooks(faces)
    expect(window.scrollY).toBe((faces[0].cursor.y - window.innerHeight) * handsfree.plugin.Scrolling.scrollSpeed)

    // No Scroll
    faces[0].cursor.y = window.innerHeight / 2
    window.scrollTo(0, 10)
    handsfree._onFrameHooks(faces)
    expect(window.scrollY).toBe(10)
  })
})