module objects {
    export class Block extends objects.GameObject {
        
        private _movingBlock : boolean;
        private _vanishingBlock : boolean;
        private _vanishTime : number;
        private _moveLeft : boolean;
        private _moveSpeed : number;
        private _cleanUp : boolean;
        
        constructor(defaultPosition : objects.Vector2, vanishingBlock : boolean, movingBlock : boolean) {
            super("cube");
            this._cleanUp = false;
            if (vanishingBlock){
                this._vanishTime = 60;
            }
            this.position = defaultPosition;
            this._vanishingBlock = vanishingBlock;
            this._movingBlock = movingBlock;
        }
        
        public start() : void{
            super.start();
            this._moveLeft = true;
            this._moveSpeed = 15.0;
        }
        
        public update() : void{
            super.update();
            if(this._movingBlock){
                this._moveBackAndForth();
            }
        }
        
        private _moveBackAndForth() : void{
            // Move left or right
            if (this._moveLeft){
                this.position.x -= this._moveSpeed * 0.1;
            } else {
                this.position.x += this._moveSpeed * 0.1;
            }
            // If block is at bounds move opposite direction
            if (this.position.x < 125){
                this._moveLeft = false;
            } else if (this.position.x > 475){
                this._moveLeft = true;
            }
        }
        
        public beginVanish() : void{
            this._vanishTime -= 1;
            if (this._vanishTime == 0){
                this._cleanUp = true;
                console.log("Destroy");
            }
        }
        
        public getVanishing() : boolean {
            return this._vanishingBlock;
        }
        
        public getCleanup() : boolean {
            return this._cleanUp;
        }
        
        public setCleanup(cleanUp : boolean) {
            this._cleanUp = true;
        }
    }
}