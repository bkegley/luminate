export interface IMapper {
  toDomain<T, K>(obj: T): Promise<K>
  toPersistence<T, K>(obj: T): Promise<K>
}
