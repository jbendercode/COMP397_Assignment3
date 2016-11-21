var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Block = (function (_super) {
        __extends(Block, _super);
        function Block(defaultPosition, vanishingBlock, movingBlock) {
            _super.call(this, "cube");
            this._cleanUp = false;
            if (vanishingBlock) {
                this._vanishTime = 60;
            }
            this.position = defaultPosition;
            this._vanishingBlock = vanishingBlock;
            this._movingBlock = movingBlock;
        }
        Block.prototype.start = function () {
            _super.prototype.start.call(this);
            this._moveLeft = true;
            this._moveSpeed = 15.0;
        };
        Block.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._movingBlock) {
                this._moveBackAndForth();
            }
        };
        Block.prototype._moveBackAndForth = function () {
            // Move left or right
            if (this._moveLeft) {
                this.position.x -= this._moveSpeed * 0.1;
            }
            else {
                this.position.x += this._moveSpeed * 0.1;
            }
            // If block is at bounds move opposite direction
            if (this.position.x < 125) {
                this._moveLeft = false;
            }
            else if (this.position.x > 475) {
                this._moveLeft = true;
            }
        };
        Block.prototype.beginVanish = function () {
            this._vanishTime -= 1;
            if (this._vanishTime == 0) {
                this._cleanUp = true;
                console.log("Destroy");
            }
        };
        Block.prototype.getVanishing = function () {
            return this._vanishingBlock;
        };
        Block.prototype.getCleanup = function () {
            return this._cleanUp;
        };
        Block.prototype.setCleanup = function (cleanUp) {
            this._cleanUp = true;
        };
        return Block;
    }(objects.GameObject));
    objects.Block = Block;
})(objects || (objects = {}));
//# sourceMappingURL=block.js.map