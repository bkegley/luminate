export const createModel = <T extends any>(obj: T) => {
  return class MockedModel {
    constructor(private data: any) {}
    save = jest.fn().mockResolvedValue(this.data)
    static find = jest.fn().mockResolvedValue([obj])
    static findOne = jest.fn().mockResolvedValue(obj)
    static findOneAndUpdate = jest.fn().mockResolvedValue(obj)
    static deleteOne = jest.fn().mockResolvedValue(true)
  }
}
