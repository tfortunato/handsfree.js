const plugin = require('./Scrolling')
const poses = [{
  face: {
    cursor: {
      x: 0,
      y: -10
    }
  }
}]

describe('Plugin: Scrolling', () => {
  it('scrolls the page vertically', () => {
    const handsfree = new Handsfree()
    let scrollTo = 1000
    handsfree._use(plugin)
    handsfree._reservePoses()
  
    // Scroll up
    document.body.style.height = '10000px'
    window.scrollTo(0, scrollTo)
    handsfree._onFrameHooks(poses)
    expect(window.scrollY).toBe(scrollTo + poses[0].face.cursor.y * handsfree.plugin.Scrolling.scrollSpeed)

    // Scroll down
    poses[0].face.cursor.y = window.innerHeight + 1
    window.scrollTo(0, 0)
    handsfree._onFrameHooks(poses)
    expect(window.scrollY).toBe((poses[0].face.cursor.y - window.innerHeight) * handsfree.plugin.Scrolling.scrollSpeed)

    // No Scroll
    poses[0].face.cursor.y = window.innerHeight / 2
    window.scrollTo(0, 10)
    handsfree._onFrameHooks(poses)
    expect(window.scrollY).toBe(10)
  })
})