"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Doc {
    constructor(id, cat = null, name = "", price = 0, price_c = "", inStock = false, author = "", author_s = "", series_t = "", sequence_i = 0, genre_s = "") {
        this.id = id;
        this.cat = cat;
        this.name = name;
        this.price = price;
        this.price_c = price_c;
        this.inStock = inStock;
        this.author = author;
        this.author_s = author_s;
        this.series_t = series_t;
        this.sequence_i = sequence_i;
        this.genre_s = genre_s;
    }
}
exports.Doc = Doc;
// Converts JSON strings to/from your types
var Convert;
(function (Convert) {
    function toDoc(json) {
        return JSON.parse(json);
    }
    Convert.toDoc = toDoc;
    function docToJson(value) {
        return JSON.stringify(value);
    }
    Convert.docToJson = docToJson;
})(Convert = exports.Convert || (exports.Convert = {}));
