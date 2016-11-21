module objects {
    export class Player extends objects.GameObject {
        private _gravity : number = 4.0;

        private _velocity : objects.Vector2;
        private _accelerationX : number;
        private _jumpSpeed : number = 10;
        private _friction : number = -0.8;

        private _isDead : boolean = false;
        private _isGrounded : boolean = false;
        private _isJumping : boolean = false;
        private _isRunning : boolean = false;
        
        public isColliding : boolean = false;

        constructor(imgString : string) {
            super(imgString);
            this.start();
        }

        public start() : void {
            this._velocity = new objects.Vector2(0,0);
            this.position = new objects.Vector2(175, 2660);
            this._accelerationX = 0;
            this.setIsGrounded(false);
        }

        public update() : void {
            // Player Controls
            if (controls.JUMP && this._isGrounded){
                this.jump();
            } else if (controls.LEFT){
                this.gotoAndStop("left");
                this.moveLeft();
            } else if (controls.RIGHT){
                this.gotoAndStop("right");
                this.moveRight();
            } else {
                this.gotoAndStop("idle");
            }

            // Apply acceleration and friction to velocity
            this._velocity.x += this._accelerationX;
            this._velocity.x *= this._friction;
            this.position.x -= this._velocity.x;

            if(this._velocity.y > this._gravity) {
                this._velocity.y = this._gravity;
            }
            
            if(this._isGrounded) {
                this._velocity.y = 0;
            } else {
                this._velocity.y += this._gravity;
                this.position.y += this._velocity.y;
                this.gotoAndStop("jump");
            }
            
            super.update();
        }

        public getVelocity() : objects.Vector2 {
            return this._velocity;
        }

        public setVelocity(newVelocity : objects.Vector2) {
            this._velocity = newVelocity;
        }

        public getIsGrounded() : boolean {
            return this._isGrounded;
        }

        public setIsGrounded(b : boolean) : void {
            this._isGrounded = b;
        }

        public moveRight() : void {
            this._accelerationX += 0.4;
        }
        public moveLeft() : void {
            this._accelerationX += -0.4;
        }
        public resetAcceleration() : void {
            this._accelerationX = 0;
            this._velocity.x = 0;
            this.gotoAndStop("idle");
        }
        public jump() : void {
            this.setIsGrounded(false);
            this._velocity.y += -46;
            this._isJumping = true;
        }
    }
}