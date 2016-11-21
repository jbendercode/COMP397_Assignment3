/// <reference path = "_reference.ts" />

// Last updated Nov 20th, 2016
// Edited by: Josh Bender

// Global Variables
var assets;
var canvas: HTMLElement;
var stage: createjs.Stage;
var lastScore: number;

var spriteSheetLoader : createjs.SpriteSheetLoader;
var atlas : createjs.SpriteSheet;

var currentScene : objects.Scene;
var scene: number;

// Preload Assets required
var assetData:objects.Asset[] = [
    {id: "bg", src: "../../Assets/images/background-iceman.png"},
    {id: "iceman-idle", src: "../../Assets/images/iceman-idle.png"},
    {id: "iceman-jumping", src: "../../Assets/images/iceman-jumping.png"},
    {id: "iceman-moving", src: "../../Assets/images/iceman-moving.png"},
    {id: "iceman-spritesheet", src: "../../Assets/images/iceman-ss.png"},
    {id: "menu-bg", src: "../../Assets/images/menu-bg-iceman.png"},
    {id: "play", src: "../../Assets/images/play.png"},
    {id: "how-to-play", src: "../../Assets/images/how-to-play.png"},
    {id: "inst-bg", src: "../../Assets/images/instructions-iceman.png"},
    {id: "back", src: "../../Assets/images/back.png"}
];

function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    assets.installPlugin(createjs.Sound);
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
    
    // Initialize Cubeman sprites
    let atlasData = {
        images: [
            assets.getResult("iceman-spritesheet")
        ],
        
        frames: {width: 75, height: 75, count: 5, regX: 37.5, regY: 37.5, spacing: 0, margin: 0},
        
        animations: {
            idle: 0,
            jump: 1,
            left: 3,
            right: 2,
            cube: 4
        },
        
        texturepacker: [
                "SmartUpdateHash: $TexturePacker:SmartUpdate:6b44ef51929ea21e17ff1b07ec9c1090:a443013636a6d3e24441fc0f2a91ca43:a99356c10d69482e9bee53d25c3d05e1$",
                "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
        ]
    
    }

    atlas = new createjs.SpriteSheet(atlasData);

    scene = config.Scene.MENU;
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
        case config.Scene.INST :
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INST scene");
            break;
        case config.Scene.GAMEOVER :
            stage.removeAllChildren();
            currentScene = new scenes.GameOver();
            console.log("Starting GAMEOVER scene");
            break;
        case config.Scene.WINNER :
            stage.removeAllChildren();
            currentScene = new scenes.Winner();
            console.log("Starting WIN scene");
            break;
    }
    
}