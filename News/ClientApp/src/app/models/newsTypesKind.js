"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewsTypesKind = /** @class */ (function () {
    function NewsTypesKind(_id, _nameKind, _idNewsType) {
        this.id = _id,
            this.nameKind = _nameKind,
            this.idNewsType = _idNewsType;
    }
    NewsTypesKind.searchTypesKind = function (newsTypesKind, typeId) {
        var list = [];
        newsTypesKind.forEach(function (type) {
            if (type.idNewsType == typeId) {
                list.push(type);
            }
        });
        return list;
    };
    return NewsTypesKind;
}());
exports.NewsTypesKind = NewsTypesKind;
//# sourceMappingURL=newsTypesKind.js.map