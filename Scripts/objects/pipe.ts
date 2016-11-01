module objects {
    enum PipeSize {SMALL, MEDIUM, LARGE}
    
    export class Pipe extends objects.GameObject {
        private _pipeSize : string;

        constructor(pipeSize : string, defaultPosition : objects.Vector2) {
            super(atlas, pipeSize);
            this.position.x = defaultPosition.x;
            this.position.y = defaultPosition.y;
        }
    }
}