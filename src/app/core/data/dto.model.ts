export interface DtoConstructor<TDto extends Dto> {
  new (): TDto;
}

export class Dto<TKey = unknown> {
  public key: TKey;
}
