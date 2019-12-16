const createCursorHash = (string: string) => Buffer.from(string.toString()).toString('base64')

const parseCursorHash = (string: string) => Buffer.from(string.toString(), 'base64').toString('utf-8')

export {createCursorHash, parseCursorHash}
