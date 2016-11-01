/// <reference path = "_reference.ts" />

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader : createjs.SpriteSheetLoader;
var atlas : createjs.SpriteSheet;

var currentScene : objects.Scene;
var scene: number;

// Preload Assets required
var assetData:objects.Asset[] = [
    {id: "bg", src: "../../Assets/images/allScene.png"},
    {id: "floor", src: "../../Assets/images/floor.png"},
    {id: "atlas", src: "../../Assets/images/Test.png"}
];

function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    // assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);

    let atlasData = {
        "images": [
            /*
            assets.getResult("player"),
            assets.getResult("block"),
            assets.getResult("pipe1.png"),
            assets.getResult("pipe2.png"),
            assets.getResult("pipe3.png"),
            assets.getResult("qBlock")
            */
            assets.getResult("atlas")
        ],
        "frames":[
            [40,0,43,86,0,0,0], 
            [83,0,45,45,0,0,0],
            [0,216,87,87,0,0,0],
            [0,86,87,130,0,0,0],
            [0,303,93,175,0,0,0],
            [0,0,40,45,0,0,0]
        ],
        "animations":{
            "player" : { "frames" : [0] },
            "block" : { "frames" : [1] },
            "pipe1" : { "frames" : [2] },
            "pipe2" : { "frames" : [3] },
            "pipe3" : { "frames" : [4] },
            "qBlock" : { "frames" : [5] }
        }, 
    }

    atlas = new createjs.SpriteSheet(atlasData);

    scene = config.Scene.GAME;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
        case config.Scene.GAME :
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting PLAY scene");
            break;
    }
    
}