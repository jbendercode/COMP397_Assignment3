module scenes {
    export class Play extends objects.Scene {

        // Private instance variables
        private _score : number;
        private _scoreCounter : number;
        private _scoreLabel : objects.Label;
        
        private _bg : createjs.Bitmap;
        private _player : objects.Player;
        private _scrollableObjContainer : createjs.Container;

        private _scrollTrigger : number = 350;
        private _ground : number;
        private _boundsXOffset : number;
        
        private _blocks : objects.Block[];

        constructor() {
            super();    
            this.start();
        }

        public start() : void {
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
            
            for(let block of this._blocks) {
                this._scrollableObjContainer.addChild(block); 
            }
            
            this._scrollableObjContainer.addChild(this._player);
            
            this.addChild(this._scrollableObjContainer);
            
            // Add score label
            this._scoreLabel = new objects.Label("0 ft", "36px Consolas", "#0F0",  config.Screen.CENTER_X - 100, config.Screen.CENTER_Y - 290);
            this.addChild(this._scoreLabel);
            
            
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;

            //createjs.Sound.play("theme");

            stage.addChild(this);
        }

        public update() : void {
            // Update score
            this._updateScore();
            this._scoreLabel.text = (this._score + " ft");
            
            // Check if player is grounded
            if(!this._player.getIsGrounded())
                this._checkPlayerWithFloor();
            
            // Check for win
            if (this._checkWin()){
                scene = config.Scene.WINNER;
                changeScene();
            }
            
            // If still alive scroll level otherwise Gameover
            if(this._checkAlive()) { 
                this._scrollUpwards(1.5);
                this._player.update();
                for(let block of this._blocks) {
                    block.update(); 
                }
            } else {
                lastScore = this._score;
                scene = config.Scene.GAMEOVER;
                changeScene();
            }
            
            // Check if player is colliding with wall
            this._checkWallBounds();
            
            // Check if player is colliding with cubes
            var collisionCount = 0;
            for(let c of this._blocks ) {
                if(this._checkCollision(this._player, c)) {
                    
                    // Check if collision is with top of object
                    if (this._checkTopFace(this._player, c)){
                        this._player.setIsGrounded(true);
                        this._isVanishingBlock(c);
                    } else {
                        // If collision is not with top return true
                        this._checkBotFace(this._player, c);
                    }
                    collisionCount += 1;
                }
                
                // Call cleanup if below scroll line
                if (c.position.y - 650 - c.getBounds().height > this._scrollableObjContainer.regY){
                    c.setCleanup(true);
                }
                
                // Check if cleanup needs to be called
                if (c.getCleanup()){
                    var index = this._blocks.indexOf(c);
                    this._blocks.splice(index, 1);
                    this._scrollableObjContainer.removeChild(c);
                    this._player.setIsGrounded(false);
                }
            }
            if (collisionCount == 0 && this._player.y < this._ground){
                this._player.setIsGrounded(false);
            }
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

        private _checkAlive() : boolean {
            if (this._player.position.y - 575 - this._player.getBounds().height > this._scrollableObjContainer.regY){
                return false;
            } else {
                return true;
            }
        }
        
        private _checkWin() : boolean {
            return this._player.position.y < 0;
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

        private _checkCollision(player : objects.Player, obj2 : objects.Block) : boolean {

            if(obj2.x < player.x + player.getBounds().width &&
             obj2.x + obj2.getBounds().width > player.x &&
             obj2.y < player.y + player.getBounds().height &&
             obj2.y + obj2.getBounds().height > player.y) {
                
                return true;
            }
            
            return false;
        }
        
        // Check if collision happened on top face of object2 and bottom of object1
        private _checkTopFace(player : objects.Player, obj2 : objects.GameObject) : boolean{
            
            if (player.y + player.getBounds().height > obj2.y &&
                player.y < obj2.y - player.getBounds().height + 10){
                
                // Bump player up to platform if slightly below
                player.y = obj2.y - player.getBounds().height + 1;
                    
                return true;
            }
            return false;
        }
        
        // Check if collision happened on bottom face of object2 and top of object1
        private _checkBotFace(player : objects.Player, obj2 : objects.GameObject) : void{
            
            // Check if player is colliding with left side
            if (player.x + player.getBounds().width < obj2.x + 10){
                player.x = obj2.x - player.getBounds().width - 1;
                player.setVelocity(new objects.Vector2(0, player.getVelocity().y));
            // Check if player is colliding with right side
            } else if (player.x > obj2.x + obj2.getBounds().width - 10){
                player.x = obj2.x + obj2.getBounds().width + 1;
                player.setVelocity(new objects.Vector2(0, player.getVelocity().y));
            // check if player is colliding with bottom side
            } else if (player.y < obj2.y + obj2.getBounds().height + 10){
                player.y = obj2.y + player.getBounds().height + 1;
                player.setVelocity(new objects.Vector2(player.getVelocity().x, 0));
            }
        }
        
        // Check if block is a vanishing type
        private _isVanishingBlock(block : objects.Block){
            if (block.getVanishing()){
                block.beginVanish();
            }
        }
        
        // Update score
        private _updateScore() : void{
            this._score = Math.floor((this._player.position.y - 2735) * -0.05);
        }
    }
}