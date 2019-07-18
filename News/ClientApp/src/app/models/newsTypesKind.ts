
export class NewsTypesKind {
  id: number;
  nameKind: string;
  idNewsType: number;

  constructor(
    _id: number,
    _nameKind: string,
    _idNewsType: number
  ) {
    this.id = _id,
    this.nameKind = _nameKind,
    this.idNewsType = _idNewsType
  }

  public static searchAllTypesKind(newsTypesKind: NewsTypesKind[], typeId: number) {
    var list: NewsTypesKind[] = [];
    newsTypesKind.forEach((type) => {
      if (type.idNewsType == typeId) {
        list.push(type);
      }
    })
    return list;
  }

  public static searchKindId(newsTypesKind: NewsTypesKind[], inputNameKind: string) {
    var id;
    newsTypesKind.forEach((kind) => {
      if (kind.nameKind == inputNameKind)
        id = kind.id;
    })
    return id;
  }

  public static searchNameKind(newTypesKinds: NewsTypesKind[], idNewsTypesKind: number) {
    var name;
    newTypesKinds.forEach((kind) => {
      if (kind.id == idNewsTypesKind)
        name = kind.nameKind;
    })
    return name;
  }
}

