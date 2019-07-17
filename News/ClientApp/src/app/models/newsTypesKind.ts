
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

  public static searchTypesKind(newsTypesKind: NewsTypesKind[], typeId: number) {
    var list: NewsTypesKind[] = [];
    newsTypesKind.forEach((type) => {
      if (type.idNewsType == typeId) {
        list.push(type);
      }
    })
    return list;
  }
}

