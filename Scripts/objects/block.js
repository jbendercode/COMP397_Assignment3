var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Block = (function (_super) {
        __extends(Block, _super);
        function Block(defaultPosition) {
            _super.call(this, "block");
            this.position = defaultPosition;
        }
        return Block;
    }(objects.GameObject));
    objects.Block = Block;
})(objects || (objects = {}));
//# sourceMappingURL=block.js.map