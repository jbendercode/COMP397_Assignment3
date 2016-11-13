module objects {
    export class Vector2 extends createjs.Point {
        constructor(x:number = 0, y:number = 0) {
            super(x,y);
        }

        public add(otherVec : objects.Vector2) { 
            return new objects.Vector2(this.x + otherVec.x, this.y + otherVec.y);
        }

        public magnitude() : number {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }

        public normalize() : objects.Vector2 {
            var mag = this.magnitude();
            return new objects.Vector2(this.x / mag, this.y / mag);
        }
    } 
}