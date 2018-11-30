const STUBS = require('../test/jest-polyfills')
const Handsfree = require('./Handsfree')
let handsfree = null
let faces = require('../src/store/faces/1-wink-face.json')
STUBS.mediaDevices.support()

describe('Handsfree.use()', () => {
  it('Adds a plugin to handsfree.plugin', () => {
    handsfree = new Handsfree({debug: true})

    handsfree.use({name: 'UnitTest123'})
    expect(handsfree.plugin['UnitTest123']).toBeTruthy()
  })

  it('Runs the onUse callback', () => {
    handsfree = new Handsfree({debug: true})

    handsfree.use({name: 'UnitTest123', onUse: jest.fn()})
    expect(handsfree.plugin['UnitTest123'].onUse).toHaveBeenCalled()
  })

  it('Sorts plugins alphabetically', () => {
    let plugins = []
    handsfree = new Handsfree({debug: true})

    handsfree.use({name: 'UnitTest123'})
    handsfree.use({name: 'UnitTest000'})
    handsfree.use({name: 'UnitTest999'})

    for (let plugin in handsfree.plugin) {
      plugins.push(handsfree.plugin[plugin].name)
    }

    expect(plugins[0]).toBe('UnitTest000')
    expect(plugins[1]).toBe('UnitTest123')
    expect(plugins[2]).toBe('UnitTest999')
  })

  it('onFrame hooks are called', () => {
    handsfree = new Handsfree({debug: true})

    handsfree.use({name: 'UnitTest123', onFrame: jest.fn()})
    handsfree.onFrameHooks(faces)

    expect(handsfree.plugin['UnitTest123'].onFrame).toHaveBeenCalled()
  })

  it('includes disable/enable methods', () => {
    const onUseDisabled = jest.fn()
    const onUseEnabled = jest.fn()
    
    handsfree = new Handsfree()
    handsfree.use({
      name: 'disabledUnitTest',
      _isDisabled: true,
      onUse: onUseDisabled
    })
    handsfree.use({
      name: 'enabledUnitTest',
      _isDisabled: false,
      onUse: onUseEnabled
    })

    expect(onUseDisabled).not.toHaveBeenCalled()
    expect(onUseEnabled).toHaveBeenCalled()
  })

  it('can disable and enable plugins', () => {
    const onFrame = jest.fn()

    handsfree = new Handsfree()
    const plugin = handsfree.use({
      name: 'UnitTest123',
      _isDisabled: true,
      onFrame
    })

    handsfree.onFrameHooks(faces)
    expect(onFrame).not.toHaveBeenCalled()

    plugin.enable()
    handsfree.onFrameHooks(faces)
    expect(onFrame).toHaveBeenCalled()
    
    plugin.disable()
    handsfree.onFrameHooks(faces)
    expect(onFrame).toHaveBeenCalledTimes(1)
  })
})
