var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        // Button 
        // Filter
        // GameObject
        function GameOver() {
            _super.call(this);
            this.start();
        }
        GameOver.prototype.start = function () {
            // Add GameOver label
            this._goLabel = new objects.Label("GAME OVER", "76px Impact", "#487FFF", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y - 150);
            this.addChild(this._goLabel);
            // Add score label
            this._scoreLabel = new objects.Label("You climbed: " + String(lastScore) + " ft", "26px Impact", "#FFF", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y - 50);
            this.addChild(this._scoreLabel);
            setTimeout(function () {
                scene = config.Scene.MENU;
                changeScene();
            }, 2000);
            stage.addChild(this);
        };
        GameOver.prototype.update = function () {
        };
        return GameOver;
    }(objects.Scene));
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map