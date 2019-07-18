
export class NewsRegionModel {
  id: number;
  nameNewsRegion: string;

  constructor(
    _id: number,
    _nameNewsRegion: string
  ) {
    this.id = _id,
      this.nameNewsRegion = _nameNewsRegion
  }

  public static searchRegionId(newsRegions: NewsRegionModel[], inputNewsRegion: string) {
    var id;
    newsRegions.forEach((region) => {
      if (region.nameNewsRegion == inputNewsRegion)
        id = region.id;
    })
    return id;
  }

  public static searchNameRegion(newsRegions: NewsRegionModel[], idNewsRegion: number) {
    var name;
    newsRegions.forEach((region) => {
      if (region.id == idNewsRegion) 
        name = region.nameNewsRegion;
    })
    return name;
  }
}

