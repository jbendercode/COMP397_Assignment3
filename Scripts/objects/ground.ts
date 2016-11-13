module objects {
    export class Ground extends objects.GameObject {

        private defaultPosition : objects.Vector2;

        constructor() {
            super("ground");

            this.defaultPosition = new objects.Vector2(0, 538);
            this.position = this.defaultPosition;
        }
    }
}