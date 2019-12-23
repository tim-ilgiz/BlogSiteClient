export class Post
{
    constructor (id:number, name:string, linkUrl:string, image:string, parentId:number, click:number)
    {
        this.id = id;
        this.name = name;
        this.linkUrl = linkUrl;
        this.image = image;
        this.parentId = parentId;
        this.click = click;
    }
    id:number;
    name:string;
    linkUrl:string;
    image:string;
    parentId:number;
    isAnimate:boolean = undefined;
    postSize:number = 200;
    click:number;
}
