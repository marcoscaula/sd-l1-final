import { PelisCollection, Peli } from "./models";

type Option = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
  add?: Peli;
};

class PelisController {
  pelicollection: PelisCollection;

  constructor() {
    this.pelicollection = new PelisCollection();
  }

  async get(option?: Option): Promise<Peli[]> {
    if (option?.id) {
      const peli = await this.pelicollection.getById(option.id);
      return peli ? [peli] : []; 
    } else if (option?.search) {
      return await this.pelicollection.search(option.search);
    } else if (option?.add) {
      const result = await this.pelicollection.addPeli(option.add);
      return result ? [] : []; 
    } else {
      return await this.pelicollection.getAll(); 
    }
  }
}

export { PelisController, Option };
