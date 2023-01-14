import { Injectable } from '@angular/core';
import { Folder } from './folder';
import { Recipie } from './recipie';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDataService {
  createDb() {
    const recipies = [
      { id: 1, parent: 1, name: 'Pizza', ingredients: 'Woda' },
      { id: 2, parent: 1, name: 'Spaghetti', ingredients: 'Makaron' },
      { id: 3, parent: 1, name: 'Lasagne', ingredients: 'Makaron' },
      { id: 4, parent: 3, name: 'Zupa grzybowa', ingredients: 'Grzyby' },
      { id: 5, parent: 0, name: 'Ciasto na pierogi', ingredients: 'mąka' },
      { id: 6, parent: 2, name: 'Sernik', ingredients: 'Ser biały' },
      { id: 7, parent: 2, name: 'Brownie', ingredients: 'Czekolada' },
    ];

    const folders: Folder[] = [
      {
        id: 0,
        parent: 0,
        name: 'Przepisy',
        recipies: [recipies[4]],
        folders: [
          {
            id: 1,
            name: 'Przepisy kuchni włoskiej',
            recipies: [recipies[0], recipies[1], recipies[2]],
            folders: [],
          },
          {
            id: 2,
            name: 'Ciasta',
            recipies: [recipies[5], recipies[6]],
            folders: [],
          },
          { id: 3, name: 'Zupy', recipies: [recipies[3]], folders: [] },
        ],
      },
      {
        id: 1,
        parent: 0,
        name: 'Przepisy kuchni włoskiej',
        recipies: [recipies[0], recipies[1], recipies[2]],
        folders: [],
      },
      {
        id: 2,
        parent: 0,
        name: 'Ciasta',
        recipies: [recipies[5], recipies[6]],
        folders: [],
      },
      { id: 3, parent: 0, name: 'Zupy', recipies: [recipies[3]], folders: [] },
    ];
    return { recipies, folders };
  }

  genId(table: Recipie[] | Folder[]): number | undefined {
    return table.length > 0
      ? Math.max(...table.map((table) => table.id)) + 1
      : 0;
  }
}
