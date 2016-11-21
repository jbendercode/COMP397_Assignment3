var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Winner = (function (_super) {
        __extends(Winner, _super);
        // Button 
        // Filter
        // GameObject
        function Winner() {
            _super.call(this);
            this.start();
        }
        Winner.prototype.start = function () {
            // Add WIN label
            this._goLabel = new objects.Label("YOU WIN", "76px Impact", "#487FFF", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y - 150);
            this.addChild(this._goLabel);
            setTimeout(function () {
                scene = config.Scene.MENU;
                changeScene();
            }, 2000);
            stage.addChild(this);
        };
        Winner.prototype.update = function () {
        };
        return Winner;
    }(objects.Scene));
    scenes.Winner = Winner;
})(scenes || (scenes = {}));
//# sourceMappingURL=winner.js.map