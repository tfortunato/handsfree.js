/**
 * Handsfree.prototype.use
 */
describe('Handsfree.prototype.use', () => {
  it('adds .enable()/.disable methods', () => {
    const handsfree = new Handsfree()
    const pluginConf = {
      name: 'test-plugin',
      onDisable: jest.fn(),
      onEnable: jest.fn()
    }
    const plugin = handsfree._use(pluginConf)

    expect(plugin.disable).toBeTruthy()
    plugin._isDisabled = false
    plugin.disable()
    expect(pluginConf.onDisable).toHaveBeenCalled()
    expect(plugin._isDisabled).toBeTruthy()

    expect(plugin.enable).toBeTruthy()
    plugin._isDisabled = false
    plugin.enable()
    expect(pluginConf.onEnable).toHaveBeenCalled()
    expect(plugin._isDisabled).toBeFalsy()
  })

  it('calls onUse', () => {
    const handsfree = new Handsfree()
    const configA = {
      name: 'test-plugin',
      _isDisabled: true,
      onUse: jest.fn()
    }
    const configB = {
      name: 'test-plugin',
      onUse: jest.fn()
    }

    handsfree._use(configA)
    handsfree._use(configB)
    
    expect(configA.onUse).not.toHaveBeenCalled()
    expect(configB.onUse).toHaveBeenCalled()
  })

  it('responds to handsfree mouse events', () => {
    const handsfree = new Handsfree()
    const configEnabled = {
      name: 'test-plugin-enabled',
      onMouseDown: jest.fn(),
      onMouseDrag: jest.fn(),
      onMouseUp: jest.fn()
    }
    const configDisabled = {
      name: 'test-plugin-disabled',
      _isDisabled: true,
      onMouseDown: jest.fn(),
      onMouseDrag: jest.fn(),
      onMouseUp: jest.fn()
    }
    handsfree.faces = Handsfree._mock.faces
    handsfree._use(configEnabled)
    handsfree._use(configDisabled)
    
    window.dispatchEvent(new CustomEvent('handsfree:mouseDown', {detail: {}}))
    window.dispatchEvent(new CustomEvent('handsfree:mouseDrag', {detail: {}}))
    window.dispatchEvent(new CustomEvent('handsfree:mouseUp', {detail: {}}))

    expect(configEnabled.onMouseDown).toHaveBeenCalled()
    expect(configEnabled.onMouseDrag).toHaveBeenCalled()
    expect(configEnabled.onMouseUp).toHaveBeenCalled()
    expect(configDisabled.onMouseDown).not.toHaveBeenCalled()
    expect(configDisabled.onMouseDrag).not.toHaveBeenCalled()
    expect(configDisabled.onMouseUp).not.toHaveBeenCalled()
  })

  it('sorts plugins alphabetically', () => {})
})