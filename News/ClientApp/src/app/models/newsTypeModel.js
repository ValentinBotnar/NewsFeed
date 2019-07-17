"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewsTypeModel = /** @class */ (function () {
    function NewsTypeModel(_id, _nameNewsType) {
        this.id = _id,
            this.nameNewsType = _nameNewsType;
    }
    NewsTypeModel.searchTypeId = function (newsTypes, inputNewsType) {
        var id;
        newsTypes.forEach(function (region) {
            if (region.nameNewsType == inputNewsType)
                id = region.id;
        });
        return id;
    };
    return NewsTypeModel;
}());
exports.NewsTypeModel = NewsTypeModel;
//# sourceMappingURL=newsTypeModel.js.map