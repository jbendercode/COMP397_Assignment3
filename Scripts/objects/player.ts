module objects {
    export class Player extends objects.GameObject {
        private _gravity : number = 9.81;

        private _maxSpeedX : number = 1;
        private _velocity : objects.Vector2;
        private _accelerationX : number;
        private _jumpSpeed : number = 10;
        private _friction : number = -1;

        private _marioState : number = config.MarioState.SMALL;
        private _isStar : boolean = false;
        private _isDead : boolean = false;
        private _isGrounded : boolean = false;

        constructor(imgString : string) {
            super(atlas, imgString);
            this.start();
        }

        public start() : void {
            this._velocity = new objects.Vector2(0,0);
            this.position = new objects.Vector2(30, 0);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height;
        }

        public update() : void {
            if(this._isGrounded)
                this._friction = 0.75;
            else {
                this._friction = 0;
            }
            
            // AccelerationX affects Velocity.x
            // Gravity affects Velocity.y
            // MaxSpeed caps Velocity.x
            if(Math.abs(this._velocity.x) < this._maxSpeedX) {
                
            }

            this._velocity.x += this._accelerationX;
            this.position.x += this._velocity.x;

            this.position.y += this._velocity.y + this._gravity;
            /*
            this._velocity.x *= this._friction;
            this.position.x += this._velocity.x;

            if(!this._isGrounded)
                this.position.y += this._velocity.y + this._gravity;
            */

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
            this._accelerationX += 0.05;
        }
        public moveLeft() : void {
            this._accelerationX -= 0.05;
        }
    }
}