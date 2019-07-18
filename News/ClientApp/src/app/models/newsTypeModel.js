"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewsTypeModel = /** @class */ (function () {
    function NewsTypeModel(_id, _nameNewsType) {
        this.id = _id,
            this.nameNewsType = _nameNewsType;
    }
    NewsTypeModel.searchTypeId = function (newsTypes, inputNewsType) {
        var id;
        newsTypes.forEach(function (type) {
            if (type.nameNewsType == inputNewsType)
                id = type.id;
        });
        return id;
    };
    NewsTypeModel.searchNameType = function (newsTypes, idNewsType) {
        var name;
        newsTypes.forEach(function (type) {
            if (type.id == idNewsType)
                name = type.nameNewsType;
        });
        return name;
    };
    return NewsTypeModel;
}());
exports.NewsTypeModel = NewsTypeModel;
//# sourceMappingURL=newsTypeModel.js.map