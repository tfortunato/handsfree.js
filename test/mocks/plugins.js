/**
 * Adds plugins to a handsfree instance
 */
module.exports = (handsfree) => {
  const plugins = [
    {
      name: 'plugin-a'
    },
    {
      name: 'plugin-b',
      onStart () {Handsfree._mock.spy.onStart++}
    },
    {
      name: 'plugin-c',
      onStart () {Handsfree._mock.spy.onStart++},
      onStop () {Handsfree._mock.spy.onStop++}
    }
  ]

  // Use each plugin
  plugins.forEach(plugin => {
    handsfree._use(plugin)
  })
}