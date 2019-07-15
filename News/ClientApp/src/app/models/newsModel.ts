
export class NewsModel {
  id: number;
  header: string;
  text: string;

  constructor(
    _id: number,
    _header: string,
    _text: string
  ) {
      this.id = _id,
      this.header = _header,
      this.text = _text
  }
}

