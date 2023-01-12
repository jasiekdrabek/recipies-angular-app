import { Recipie } from './recipie';

export interface Folder {
  id?: number;
  name?: string;
  parent?: number;
  folders?: Folder[];
  recipies?: Recipie[];
}
