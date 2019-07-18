"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewsTypesKind = /** @class */ (function () {
    function NewsTypesKind(_id, _nameKind, _idNewsType) {
        this.id = _id,
            this.nameKind = _nameKind,
            this.idNewsType = _idNewsType;
    }
    NewsTypesKind.searchAllTypesKind = function (newsTypesKind, typeId) {
        var list = [];
        newsTypesKind.forEach(function (type) {
            if (type.idNewsType == typeId) {
                list.push(type);
            }
        });
        return list;
    };
    NewsTypesKind.searchKindId = function (newsTypesKind, inputNameKind) {
        var id;
        newsTypesKind.forEach(function (kind) {
            if (kind.nameKind == inputNameKind)
                id = kind.id;
        });
        return id;
    };
    return NewsTypesKind;
}());
exports.NewsTypesKind = NewsTypesKind;
//# sourceMappingURL=newsTypesKind.js.map