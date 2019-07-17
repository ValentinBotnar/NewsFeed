
export class NewsModel {
  id: number;
  header: string;
  text: string;
  idType: number;
  idRegion: number;
  idTypesKind: number;

  constructor(
    _id: number,
    _header: string,
    _text: string,
    _idType: number,
    _idRegion: number,
    _idTypesKind: number
  ) {
    this.id = _id,
      this.header = _header,
      this.text = _text,
      this.idType = _idType,
      this.idRegion = _idRegion,
      this.idTypesKind = _idTypesKind
  }
}

