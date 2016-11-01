var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var PipeSize;
    (function (PipeSize) {
        PipeSize[PipeSize["SMALL"] = 0] = "SMALL";
        PipeSize[PipeSize["MEDIUM"] = 1] = "MEDIUM";
        PipeSize[PipeSize["LARGE"] = 2] = "LARGE";
    })(PipeSize || (PipeSize = {}));
    var Pipe = (function (_super) {
        __extends(Pipe, _super);
        function Pipe(pipeSize, defaultPosition) {
            _super.call(this, atlas, pipeSize);
            this.position.x = defaultPosition.x;
            this.position.y = defaultPosition.y;
        }
        return Pipe;
    }(objects.GameObject));
    objects.Pipe = Pipe;
})(objects || (objects = {}));
//# sourceMappingURL=pipe.js.map