module scenes {
    export class Play extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _player : objects.Player;
        private _scrollableObjContainer : createjs.Container;

        private _scrollTrigger : number = 350;
        private _ground : number;
        private _boundsXOffset : number;

        constructor() {
            super();    
            this.start();
        }

        public start() : void {
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
        }

        public update() : void {

            if(!this._player.getIsGrounded())
                this._checkPlayerWithFloor();
            
            // If still alive scroll level otherwise Gameover
            if(this.checkAlive()) { 
                this._scrollUpwards(1);
                this._player.update();
            } else {
                console.log("DEAD");
            }
            this._checkWallBounds();
        }
        
        private _scrollUpwards(speed : number) : void{
            if(this._scrollableObjContainer.regY > 0){
                this._scrollableObjContainer.regY -= speed;
            }
        }

        private _onKeyDown(event: KeyboardEvent) : void {
             switch(event.keyCode) {
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
        }

        private _onKeyUp(event : KeyboardEvent) : void {
            switch(event.keyCode) {
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
        }

        private checkAlive() : boolean {
            if (this._player.position.y - 565 - this._player.getBounds().height > this._scrollableObjContainer.regY){
                return false;
            } else {
                return true;
            }
        }
         
        private _checkPlayerWithFloor() : void {
            if(this._player.y > this._ground) {
                console.log("HIT GROUND");
                this._player.position.y = this._ground;
                this._player.setIsGrounded(true);
            }
        }
        
        private _checkWallBounds() : void {
            if (this._player.position.x < 300 - this._boundsXOffset){
                this._player.resetAcceleration();
                this._player.position.x = 300 - this._boundsXOffset;
            } else if (this._player.position.x > 300 + this._boundsXOffset){
                this._player.resetAcceleration();
                this._player.position.x = 300 + this._boundsXOffset;
            }
        }

/*

        private checkCollision(obj1 : objects.GameObject, obj2 : objects.GameObject) : boolean {

            if(obj2.x < obj1.x + obj1.getBounds().width &&
                obj2.x + obj2.getBounds().width > obj1.x &&
                obj2.y < obj1.y + obj1.getBounds().height &&
                obj2.y + obj2.getBounds().height > obj1.y - 10) {
                return true;
            }

            return false;
        }*/
    }
}