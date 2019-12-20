export class Post
{
    constructor (id:number, name:string, link:string, image:string, parentId:number)
    {
        this.id = id;
        this.name = name;
        this.link = link;
        this.image = image;
        this.parentId = parentId;
    }
    id:number;
    name:string;
    link:string;
    image:string;
    parentId:number;
    isAnimate:boolean = undefined;
    postSize:number = 200;
}
