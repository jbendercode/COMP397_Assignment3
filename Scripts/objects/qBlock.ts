module objects {
    export class qBlock extends objects.GameObject {
        constructor(defaultPosition : objects.Vector2) {
            super("qBlock");
            this.position = defaultPosition;
        }
    }
}