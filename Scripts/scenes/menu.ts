/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Menu extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        private _bg : createjs.Bitmap;
            
        // Button 
        private _playBtn : objects.Button;
        private _howToPlayBtn : objects.Button;
        
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            // Add bg
            this._bg = new createjs.Bitmap(assets.getResult("menu-bg"));
            this.addChild(this._bg);

            // Add play button
            this._playBtn = new objects.Button("play", config.Screen.CENTER_X + 50, config.Screen.CENTER_Y + 200);
            this._playBtn.scaleX = 0.5;
            this._playBtn.scaleY = 0.5;
            this._playBtn.cursor = "pointer";
            this.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);
            
            // Add instructions button
            this._howToPlayBtn = new objects.Button("how-to-play", config.Screen.CENTER_X - 250, config.Screen.CENTER_Y + 200);
            this._howToPlayBtn.scaleX = 0.5;
            this._howToPlayBtn.scaleY = 0.5;
            this._howToPlayBtn.cursor = "pointer";
            this.addChild(this._howToPlayBtn);
            this._howToPlayBtn.on("click", this._howToPlayBtnClick, this);

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        public update() : void {

        }

        private _playBtnClick(event : createjs.MouseEvent) {
            scene = config.Scene.GAME;
            changeScene();
        }
        
        private _howToPlayBtnClick(event : createjs.MouseEvent) {
            scene = config.Scene.INST;
            changeScene();
        }
    }
}