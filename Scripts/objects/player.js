var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(imgString) {
            _super.call(this, imgString);
            this._gravity = 6.0;
            this._maxSpeedX = 10;
            this._jumpSpeed = 10;
            this._friction = -0.5;
            this._isDead = false;
            this._isGrounded = false;
            this._isJumping = false;
            this._isRunning = false;
            this.isColliding = false;
            this.start();
        }
        Player.prototype.start = function () {
            this._velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(300, 2660);
            this._accelerationX = 0;
            this.setIsGrounded(false);
        };
        Player.prototype.update = function () {
            // Player Controls
            if (controls.JUMP && this._isGrounded) {
                this.jump();
            }
            else if (controls.LEFT) {
                this.gotoAndStop("left");
                this.moveLeft();
            }
            else if (controls.RIGHT) {
                this.gotoAndStop("right");
                this.moveRight();
            }
            else {
                this.gotoAndStop("idle");
            }
            // Velocity
            if (this._velocity.x > this._maxSpeedX) {
                this._velocity.x = this._maxSpeedX;
            }
            else if (this._velocity.x < -this._maxSpeedX) {
                this._velocity.x = -this._maxSpeedX;
            }
            else {
                this._velocity.x += this._accelerationX;
            }
            if (Math.abs(this._velocity.x) < this._maxSpeedX) {
                this._velocity.x += this._accelerationX;
            }
            this._velocity.x *= this._friction;
            if (Math.abs(this._velocity.x) > 0.05) {
                this.position.x -= this._velocity.x;
            }
            if (this._velocity.y > this._gravity) {
                this._velocity.y = this._gravity;
            }
            if (this._isGrounded) {
                this._velocity.y = 0;
            }
            else {
                this._velocity.y += this._gravity;
                this.position.y += this._velocity.y;
                this.gotoAndStop("jump");
            }
            _super.prototype.update.call(this);
        };
        Player.prototype.getVelocity = function () {
            return this._velocity;
        };
        Player.prototype.setVelocity = function (newVelocity) {
            this._velocity = newVelocity;
        };
        Player.prototype.getIsGrounded = function () {
            return this._isGrounded;
        };
        Player.prototype.setIsGrounded = function (b) {
            this._isGrounded = b;
        };
        Player.prototype.moveRight = function () {
            this._accelerationX += 0.15;
        };
        Player.prototype.moveLeft = function () {
            this._accelerationX += -0.15;
        };
        Player.prototype.resetAcceleration = function () {
            this._accelerationX = 0;
            this._velocity.x = 0;
            this.gotoAndStop("idle");
        };
        Player.prototype.jump = function () {
            this.setIsGrounded(false);
            this._velocity.y = -65;
            this._isJumping = true;
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map