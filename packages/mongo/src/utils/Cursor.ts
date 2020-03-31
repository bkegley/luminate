export class Cursor {
  public static createCursor(string: string | Date) {
    const stringToHash = typeof string === 'string' ? string : string.toISOString()
    return Buffer.from(stringToHash).toString('base64')
  }

  public static parseCursor(string: string) {
    return new Date(Buffer.from(string, 'base64').toString('utf-8')).toISOString()
  }
}
