module scenes {
    export class GameOver extends objects.Scene {

        // Private instance variables
        private _score : number;
        
        // Label or bitmap
        private _scoreLabel : objects.Label;
        private _goLabel : objects.Label;
            
        // Button 
        
        // Filter
        
        // GameObject

        constructor() {
            super();
            this.start();
        }

        public start() : void {
            // Add GameOver label
            this._goLabel = new objects.Label("GAME OVER", "76px Impact", "#487FFF", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y - 150);
            this.addChild(this._goLabel);
            // Add score label
            this._scoreLabel = new objects.Label("You climbed: " + String(lastScore) + " ft", "26px Impact", "#FFF", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y - 50);
            this.addChild(this._scoreLabel);
            
            setTimeout(() => {
                scene = config.Scene.MENU;
                changeScene();
            }, 2000);

            stage.addChild(this);
        }

        public update() : void {
            
        }
    }
}