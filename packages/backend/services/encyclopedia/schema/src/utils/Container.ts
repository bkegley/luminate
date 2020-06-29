export interface IContainer {
  bind<T>(inter: Symbol, init: T): void
  bind<T>(inter: Symbol, init: (resolver: IResolver) => T): void
}

export interface IResolver {
  resolve<T>(clazz: Symbol): T
}

export class Container implements IContainer, IResolver {
  private registry = new Map()

  public bind<T>(inter: Symbol, init: T | ((resolver: IResolver) => T)): void {
    if (typeof init === 'function') {
      this.registry.set(inter, init)
    }
    this.registry.set(inter, init)
  }

  public resolve<T>(clazz: Symbol): T {
    const resolver = this.registry.get(clazz)
    if (typeof resolver === 'function') {
      return resolver(this)
    }
    return resolver
  }
}
