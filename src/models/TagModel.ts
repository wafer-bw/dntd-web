export class TagModel {
    public frq: number

    constructor(
        public raw: string,
        public flag: string,
        public key: string,
        public separator: string | null,
        public val: string | null,
        public clean: string,
        public cleanKey: string,
        public cleanVal: string | null,
        public rendered: string
    ) { 
        this.frq = 1
    }

}
