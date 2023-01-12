import { Folder } from "./folder";
import { RECIPIES } from "./Mock-recipies";

export const FOLDERS: Folder [] = [
    {id:0, name:"Przepisy",recipies:[RECIPIES[4]],folders:[{id:1,name:"Przepisy kuchni włoskiej",recipies:[RECIPIES[0],RECIPIES[1],RECIPIES[2]],folders:[]},
    {id:2,name:"Ciasta",recipies:[RECIPIES[5],RECIPIES[6]],folders:[]},
    {id:3,name:"Zupy",recipies:[RECIPIES[3]],folders:[]}]},
    {id:1,parent:0, name:"Przepisy kuchni włoskiej",recipies:[RECIPIES[0],RECIPIES[1],RECIPIES[2]],folders:[]},
    {id:2,parent:0,name:"Ciasta",recipies:[RECIPIES[5],RECIPIES[6]],folders:[]},
    {id:3,parent:0,name:"Zupy",recipies:[RECIPIES[3]],folders:[]}
]