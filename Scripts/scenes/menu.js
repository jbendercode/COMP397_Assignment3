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
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // Menu Class Contructor
        function Menu() {
            _super.call(this);
        }
        Menu.prototype.start = function () {
            // Add bg
            this._bg = new createjs.Bitmap(assets.getResult("menu-bg"));
            this.addChild(this._bg);
            // Add play button
            this._playBtn = new objects.Button("play", config.Screen.CENTER_X + 50, config.Screen.CENTER_Y + 200);
            this._playBtn.scaleX = 0.5;
            this._playBtn.scaleY = 0.5;
            this._playBtn.cursor = "pointer";
            this.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);
            // Add instructions button
            this._howToPlayBtn = new objects.Button("how-to-play", config.Screen.CENTER_X - 250, config.Screen.CENTER_Y + 200);
            this._howToPlayBtn.scaleX = 0.5;
            this._howToPlayBtn.scaleY = 0.5;
            this._howToPlayBtn.cursor = "pointer";
            this.addChild(this._howToPlayBtn);
            this._howToPlayBtn.on("click", this._howToPlayBtnClick, this);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
        };
        Menu.prototype._playBtnClick = function (event) {
            scene = config.Scene.GAME;
            changeScene();
        };
        Menu.prototype._howToPlayBtnClick = function (event) {
            scene = config.Scene.INST;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map