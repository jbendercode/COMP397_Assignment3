/*
    Module to store globally accessible values and states for the game.
*/
module config {
    export class Scene {
        public static MENU : number = 0;
        public static GAME : number = 1;
    }

    export class Screen {
        public static WIDTH : number = 800;
        public static HEIGHT : number = 600;
        public static CENTER_X : number = 400;
        public static CENTER_Y : number = 300;
    }
    
    export class Game {
        public static FPS : number = 60;
    }
}