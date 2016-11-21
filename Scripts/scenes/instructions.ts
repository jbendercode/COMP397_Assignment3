/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Instructions extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        private _bg : createjs.Bitmap;
            
        // Button 
        private _backBtn : objects.Button;
        
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            // Add bg
            this._bg = new createjs.Bitmap(assets.getResult("inst-bg"));
            this.addChild(this._bg);

            // Add play button
            this._backBtn = new objects.Button("back", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 200);
            this._backBtn.scaleX = 0.5;
            this._backBtn.scaleY = 0.5;
            this._backBtn.cursor = "pointer";
            this.addChild(this._backBtn);
            this._backBtn.on("click", this._backBtnClick, this);

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        public update() : void {

        }

        private _backBtnClick(event : createjs.MouseEvent) {
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}