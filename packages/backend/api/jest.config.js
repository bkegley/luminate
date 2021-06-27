const base = require('../../jest.config.base.js')
const pjson = require('./package')

module.exports = {
  ...base,
  roots: [...base.roots],
  name: pjson.name,
  displayName: pjson.name,
}
