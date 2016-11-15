var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var qBlock = (function (_super) {
        __extends(qBlock, _super);
        function qBlock(defaultPosition) {
            _super.call(this, "qBlock");
            this.position = defaultPosition;
        }
        return qBlock;
    }(objects.GameObject));
    objects.qBlock = qBlock;
})(objects || (objects = {}));
//# sourceMappingURL=qBlock.js.map