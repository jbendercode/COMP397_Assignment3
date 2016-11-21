module scenes {
    export class Winner extends objects.Scene {

        // Private instance variables
        private _score : number;
        
        // Label or bitmap
        private _goLabel : objects.Label;
            
        // Button 
        
        // Filter
        
        // GameObject

        constructor() {
            super();
            this.start();
        }

        public start() : void {
            // Add WIN label
            this._goLabel = new objects.Label("YOU WIN", "76px Impact", "#487FFF", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y - 150);
            this.addChild(this._goLabel);
            
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