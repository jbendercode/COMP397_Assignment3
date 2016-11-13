module objects {
    export class Block extends objects.GameObject {
        constructor(defaultPosition : objects.Vector2) {
            super("block");
            this.position = defaultPosition;
        }
    }
}