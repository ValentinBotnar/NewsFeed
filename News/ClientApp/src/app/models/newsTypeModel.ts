
export class NewsTypeModel {
  id: number;
  nameNewsType: string;

  constructor(
    _id: number,
    _nameNewsType: string
  ) {
    this.id = _id,
      this.nameNewsType = _nameNewsType
  }

  public static searchTypeId(newsTypes: NewsTypeModel[], inputNewsType: string) {
    var id;
    newsTypes.forEach((type) => {
      if (type.nameNewsType == inputNewsType)
        id = type.id;
    })
    return id;
  }

  public static searchNameType(newsTypes: NewsTypeModel[], idNewsType: number) {
    var name;
    newsTypes.forEach((type) => {
      if (type.id == idNewsType)
        name = type.nameNewsType;
    })
    return name;
  }
}

