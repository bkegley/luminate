const kafkaNode = jest.genMockFromModule('kafka-node')

class Producer {
  async send(payload, cb) {
    return cb(false, 'data')
  }
}

kafkaNode.Producer = Producer

module.exports = kafkaNode
