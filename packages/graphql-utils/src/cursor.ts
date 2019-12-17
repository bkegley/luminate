// currently only supports cursor-pagination referencing updatedAt field

const createCursorHash = (string: string | Date): string => {
  const stringToHash = typeof string === 'string' ? string : string.toISOString()
  return Buffer.from(stringToHash).toString('base64')
}

const parseCursorHash = (string: string): string =>
  new Date(Buffer.from(string, 'base64').toString('utf-8')).toISOString()

export {createCursorHash, parseCursorHash}
