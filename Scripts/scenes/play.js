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
            // Set global score to 0
            lastScore = 0;
            this._score = 0;
            // Set floor position and wall bounds
            this._ground = 2705;
            this._boundsXOffset = 175;
            this._bg = new createjs.Bitmap(assets.getResult("bg"));
            this._player = new objects.Player("idle");
            this._scrollableObjContainer = new createjs.Container();
            this._scrollableObjContainer.regY = 2400;
            this._scrollableObjContainer.addChild(this._bg);
            // Setup level
            this._blocks = [];
            // Platform 1
            this._blocks.push(new objects.Block(new objects.Vector2(325, 2575), false, false));
            this._blocks.push(new objects.Block(new objects.Vector2(400, 2575), false, false));
            this._blocks.push(new objects.Block(new objects.Vector2(475, 2575), false, false));
            // Platform 2
            this._blocks.push(new objects.Block(new objects.Vector2(125, 2375), false, false));
            this._blocks.push(new objects.Block(new objects.Vector2(200, 2375), false, false));
            this._blocks.push(new objects.Block(new objects.Vector2(275, 2375), false, false));
            // Platform 3
            this._blocks.push(new objects.Block(new objects.Vector2(325, 2175), true, false));
            this._blocks.push(new objects.Block(new objects.Vector2(400, 2175), true, false));
            this._blocks.push(new objects.Block(new objects.Vector2(475, 2175), false, false));
            // Platform 4
            this._blocks.push(new objects.Block(new objects.Vector2(125, 1975), false, false));
            this._blocks.push(new objects.Block(new objects.Vector2(200, 1975), false, false));
            this._blocks.push(new objects.Block(new objects.Vector2(275, 1975), false, false));
            // Platform 5
            this._blocks.push(new objects.Block(new objects.Vector2(200, 1775), false, true));
            this._blocks.push(new objects.Block(new objects.Vector2(125, 1775), false, true));
            // Platform 6
            this._blocks.push(new objects.Block(new objects.Vector2(475, 1575), false, true));
            this._blocks.push(new objects.Block(new objects.Vector2(400, 1575), false, true));
            // Platform 7
            this._blocks.push(new objects.Block(new objects.Vector2(200, 1375), false, true));
            this._blocks.push(new objects.Block(new objects.Vector2(125, 1375), false, true));
            // Platform 8
            this._blocks.push(new objects.Block(new objects.Vector2(125, 1175), false, false));
            this._blocks.push(new objects.Block(new objects.Vector2(200, 1175), false, false));
            this._blocks.push(new objects.Block(new objects.Vector2(400, 1175), true, false));
            this._blocks.push(new objects.Block(new objects.Vector2(475, 1175), true, false));
            // Staircase
            this._blocks.push(new objects.Block(new objects.Vector2(475, 975), false, true));
            this._blocks.push(new objects.Block(new objects.Vector2(400, 975), false, true));
            this._blocks.push(new objects.Block(new objects.Vector2(125, 775), false, true));
            this._blocks.push(new objects.Block(new objects.Vector2(200, 775), false, true));
            this._blocks.push(new objects.Block(new objects.Vector2(475, 575), false, true));
            this._blocks.push(new objects.Block(new objects.Vector2(400, 575), false, true));
            // Narrow case
            this._blocks.push(new objects.Block(new objects.Vector2(125, 375), false, true));
            this._blocks.push(new objects.Block(new objects.Vector2(300, 175), false, true));
            for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                var block = _a[_i];
                this._scrollableObjContainer.addChild(block);
            }
            this._scrollableObjContainer.addChild(this._player);
            this.addChild(this._scrollableObjContainer);
            // Add score label
            this._scoreLabel = new objects.Label("0 ft", "36px Consolas", "#0F0", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y - 290);
            this.addChild(this._scoreLabel);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            //createjs.Sound.play("theme");
            stage.addChild(this);
        };
        Play.prototype.update = function () {
            // Update score
            this._updateScore();
            this._scoreLabel.text = (this._score + " ft");
            // Check if player is grounded
            if (!this._player.getIsGrounded())
                this._checkPlayerWithFloor();
            // Check for win
            if (this._checkWin()) {
                scene = config.Scene.WINNER;
                changeScene();
            }
            // If still alive scroll level otherwise Gameover
            if (this._checkAlive()) {
                this._scrollUpwards(1.5);
                this._player.update();
                for (var _i = 0, _a = this._blocks; _i < _a.length; _i++) {
                    var block = _a[_i];
                    block.update();
                }
            }
            else {
                lastScore = this._score;
                scene = config.Scene.GAMEOVER;
                changeScene();
            }
            // Check if player is colliding with wall
            this._checkWallBounds();
            // Check if player is colliding with cubes
            var collisionCount = 0;
            for (var _b = 0, _c = this._blocks; _b < _c.length; _b++) {
                var c = _c[_b];
                if (this._checkCollision(this._player, c)) {
                    // Check if collision is with top of object
                    if (this._checkTopFace(this._player, c)) {
                        this._player.setIsGrounded(true);
                        this._isVanishingBlock(c);
                    }
                    else {
                        // If collision is not with top return true
                        this._checkBotFace(this._player, c);
                    }
                    collisionCount += 1;
                }
                // Call cleanup if below scroll line
                if (c.position.y - 650 - c.getBounds().height > this._scrollableObjContainer.regY) {
                    c.setCleanup(true);
                }
                // Check if cleanup needs to be called
                if (c.getCleanup()) {
                    var index = this._blocks.indexOf(c);
                    this._blocks.splice(index, 1);
                    this._scrollableObjContainer.removeChild(c);
                    this._player.setIsGrounded(false);
                }
            }
            if (collisionCount == 0 && this._player.y < this._ground) {
                this._player.setIsGrounded(false);
            }
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
        Play.prototype._checkAlive = function () {
            if (this._player.position.y - 575 - this._player.getBounds().height > this._scrollableObjContainer.regY) {
                return false;
            }
            else {
                return true;
            }
        };
        Play.prototype._checkWin = function () {
            return this._player.position.y < 0;
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
        Play.prototype._checkCollision = function (player, obj2) {
            if (obj2.x < player.x + player.getBounds().width &&
                obj2.x + obj2.getBounds().width > player.x &&
                obj2.y < player.y + player.getBounds().height &&
                obj2.y + obj2.getBounds().height > player.y) {
                return true;
            }
            return false;
        };
        // Check if collision happened on top face of object2 and bottom of object1
        Play.prototype._checkTopFace = function (player, obj2) {
            if (player.y + player.getBounds().height > obj2.y &&
                player.y < obj2.y - player.getBounds().height + 10) {
                // Bump player up to platform if slightly below
                player.y = obj2.y - player.getBounds().height + 1;
                return true;
            }
            return false;
        };
        // Check if collision happened on bottom face of object2 and top of object1
        Play.prototype._checkBotFace = function (player, obj2) {
            // Check if player is colliding with left side
            if (player.x + player.getBounds().width < obj2.x + 10) {
                player.x = obj2.x - player.getBounds().width - 1;
                player.setVelocity(new objects.Vector2(0, player.getVelocity().y));
            }
            else if (player.x > obj2.x + obj2.getBounds().width - 10) {
                player.x = obj2.x + obj2.getBounds().width + 1;
                player.setVelocity(new objects.Vector2(0, player.getVelocity().y));
            }
            else if (player.y < obj2.y + obj2.getBounds().height + 10) {
                player.y = obj2.y + player.getBounds().height + 1;
                player.setVelocity(new objects.Vector2(player.getVelocity().x, 0));
            }
        };
        // Check if block is a vanishing type
        Play.prototype._isVanishingBlock = function (block) {
            if (block.getVanishing()) {
                block.beginVanish();
            }
        };
        // Update score
        Play.prototype._updateScore = function () {
            this._score = Math.floor((this._player.position.y - 2735) * -0.05);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map