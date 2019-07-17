
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
    newsTypes.forEach((region) => {
      if (region.nameNewsType == inputNewsType)
        id = region.id;
    })
    return id;
  }
}

