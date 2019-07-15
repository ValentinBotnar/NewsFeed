
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
}

