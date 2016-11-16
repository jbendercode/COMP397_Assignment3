var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
            this._scrollTrigger = 350;
            this.start();
        }
        Play.prototype.start = function () {
            // Set floor position and wall bounds
            this._ground = 2705;
            this._boundsXOffset = 175;
            this._bg = new createjs.Bitmap(assets.getResult("bg"));
            this._player = new objects.Player("idle");
            this._scrollableObjContainer = new createjs.Container();
            this._scrollableObjContainer.regY = 2400;
            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this.addChild(this._scrollableObjContainer);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            //createjs.Sound.play("theme");
            stage.addChild(this);
        };
        Play.prototype.update = function () {
            if (!this._player.getIsGrounded())
                this._checkPlayerWithFloor();
            // If still alive scroll level otherwise Gameover
            if (this.checkAlive()) {
                this._scrollUpwards(1);
                this._player.update();
            }
            else {
                console.log("DEAD");
            }
            this._checkWallBounds();
        };
        Play.prototype._scrollUpwards = function (speed) {
            if (this._scrollableObjContainer.regY > 0) {
                this._scrollableObjContainer.regY -= speed;
            }
        };
        Play.prototype._onKeyDown = function (event) {
            switch (event.keyCode) {
                case keys.A:
                    controls.LEFT = true;
                    break;
                case keys.D:
                    controls.RIGHT = true;
                    break;
                case keys.SPACE:
                    controls.JUMP = true;
                    break;
            }
        };
        Play.prototype._onKeyUp = function (event) {
            switch (event.keyCode) {
                case keys.A:
                    controls.LEFT = false;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    break;
                case keys.SPACE:
                    controls.JUMP = false;
                    break;
            }
        };
        Play.prototype.checkAlive = function () {
            if (this._player.position.y - 565 - this._player.getBounds().height > this._scrollableObjContainer.regY) {
                return false;
            }
            else {
                return true;
            }
        };
        Play.prototype._checkPlayerWithFloor = function () {
            if (this._player.y > this._ground) {
                console.log("HIT GROUND");
                this._player.position.y = this._ground;
                this._player.setIsGrounded(true);
            }
        };
        Play.prototype._checkWallBounds = function () {
            if (this._player.position.x < 300 - this._boundsXOffset) {
                this._player.resetAcceleration();
                this._player.position.x = 300 - this._boundsXOffset;
            }
            else if (this._player.position.x > 300 + this._boundsXOffset) {
                this._player.resetAcceleration();
                this._player.position.x = 300 + this._boundsXOffset;
            }
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map