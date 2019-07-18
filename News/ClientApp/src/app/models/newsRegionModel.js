"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewsRegionModel = /** @class */ (function () {
    function NewsRegionModel(_id, _nameNewsRegion) {
        this.id = _id,
            this.nameNewsRegion = _nameNewsRegion;
    }
    NewsRegionModel.searchRegionId = function (newsRegions, inputNewsRegion) {
        var id;
        newsRegions.forEach(function (region) {
            if (region.nameNewsRegion == inputNewsRegion)
                id = region.id;
        });
        return id;
    };
    NewsRegionModel.searchNameRegion = function (newsRegions, idNewsRegion) {
        var name;
        newsRegions.forEach(function (region) {
            if (region.id == idNewsRegion)
                name = region.nameNewsRegion;
        });
        return name;
    };
    return NewsRegionModel;
}());
exports.NewsRegionModel = NewsRegionModel;
//# sourceMappingURL=newsRegionModel.js.map