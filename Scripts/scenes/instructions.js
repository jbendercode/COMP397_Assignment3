/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Instructions = (function (_super) {
        __extends(Instructions, _super);
        // Menu Class Contructor
        function Instructions() {
            _super.call(this);
        }
        Instructions.prototype.start = function () {
            // Add bg
            this._bg = new createjs.Bitmap(assets.getResult("inst-bg"));
            this.addChild(this._bg);
            // Add play button
            this._backBtn = new objects.Button("back", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 200);
            this._backBtn.scaleX = 0.5;
            this._backBtn.scaleY = 0.5;
            this._backBtn.cursor = "pointer";
            this.addChild(this._backBtn);
            this._backBtn.on("click", this._backBtnClick, this);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        Instructions.prototype.update = function () {
        };
        Instructions.prototype._backBtnClick = function (event) {
            scene = config.Scene.MENU;
            changeScene();
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map