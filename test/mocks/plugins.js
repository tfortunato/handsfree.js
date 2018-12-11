/**
 * Adds plugins to a handsfree instance
 */
module.exports = (handsfree) => {
  const plugins = [
    {
      name: 'test-disabled',
      _isDisabled: true,
      onStart () {Handsfree._mock.spy.onStart++},
      onStop () {Handsfree._mock.spy.onStop++},
      onFrame () {Handsfree._mock.spy.onFrame++}
    },
    {
      name: 'test-plugin-a'
    },
    {
      name: 'test-plugin-b',
      onStart () {Handsfree._mock.spy.onStart++}
    },
    {
      name: 'test-plugin-c',
      onStart () {Handsfree._mock.spy.onStart++},
      onStop () {Handsfree._mock.spy.onStop++},
      onFrame () {Handsfree._mock.spy.onFrame++}
    },
    {
      name: 'test-plugin-d',
      onFrame () {Handsfree._mock.spy.onFrame++}
    }
  ]

  // Use each plugin
  plugins.forEach(plugin => {
    handsfree._use(plugin)
  })
}