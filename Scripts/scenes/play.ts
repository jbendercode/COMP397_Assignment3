module scenes {
    export class Play extends objects.Scene {

        private _bg : createjs.Bitmap;

        private _ground : createjs.Bitmap;
        private _player : objects.Player;

        private _pipes : objects.Pipe[];
        private _scrollableObjContainer : createjs.Container;

        private _scrollTrigger : number = 350;

        constructor() {
            super();
            this.start();
        }

        public start() : void {
            this._bg = new createjs.Bitmap(assets.getResult("bg"));
            this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("player");

            this._pipes = [];
            this._pipes.push(new objects.Pipe(config.PipeSize.SMALL, new objects.Vector2(1208, 450)));
            this._pipes.push(new objects.Pipe(config.PipeSize.MEDIUM, new objects.Vector2(1640, 408)));
            this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(1984,363)));
            this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(2458, 363)));

            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this._scrollableObjContainer.addChild(this._ground);
            for(let pipe of this._pipes) {
                //this._scrollableObjContainer.addChild(pipe);
            }

            this._ground.y = 538;

            this.addChild(this._scrollableObjContainer);

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;

            stage.addChild(this);
        }

        public update() : void {

            this._player.update();

            if(this.checkScroll()) {
                this._scrollBGForward(this._player.getVelocity().x);
            }

            if(!this._player.getIsGrounded())
                this._checkPlayerWithFloor();

            if(controls.LEFT) {
                this._player.moveLeft();
            }

            if(controls.RIGHT) { 
                this._player.moveRight();
            }
        }

        private _onKeyDown(event: KeyboardEvent) : void {
             switch(event.keyCode) {
                case keys.W:
                    console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    console.log("D key pressed");
                    controls.RIGHT = true;
                    break;
                case keys.SPACE:
                    controls.SHOOT = true;
                    break;
            }
        }

        private _onKeyUp(event : KeyboardEvent) : void {
            switch(event.keyCode) {
                case keys.W:
                    controls.UP = false;
                    break;
                case keys.S:
                    controls.DOWN = false;
                    break;
                case keys.A:
                    controls.LEFT = false;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    break;
                case keys.SPACE:
                    controls.SHOOT = false;
                    break;
            }
        }

        private _scrollBGForward(speed : number) : void{
            if(this._scrollableObjContainer.regX < 3071 - 815)
                this._scrollableObjContainer.regX += speed;
        }

        private _checkPlayerWithFloor() : void {
            if(this._player.y > this._ground.y) {
                console.log("HIT GROUND");
                this._player.y = this._ground.y;
                this._player.setIsGrounded(true);
            }
        }

        private checkScroll() : boolean {
            if(this._player.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}