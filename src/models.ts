import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const pelis: Peli[] = await jsonfile.readFile("./pelis.json");
    return pelis;
  }

  async addPeli(peli: Peli): Promise<boolean> {
    try {
      const verifyPeli = await this.getById(peli.id); 
      if (verifyPeli) {
        return false; 
      } else {
        const pelis = await this.getAll();
        pelis.push(peli);
        await jsonfile.writeFile("./pelis.json", pelis);
        return true; 
      }
    } catch (error) {
      console.log("Error al agregar la peli: ", error);
      throw new Error("No se pudo agregar la película.");
    }
  }

  async getById(id: number): Promise<Peli | undefined> {
    try {
      const pelis = await this.getAll();
      const peliencontrada = pelis.find((p) => p.id === id);
      return peliencontrada;
    } catch (error) {
      console.log("Peli no encontrada: ", error);
      throw new Error("No se pudo encontrar la película."); 
    }
  }

  async search(option: { title?: string; tag?: string }): Promise<Peli[]> {
    try {
      const pelis = await this.getAll();
      const listafiltrada = pelis.filter((p) => {
        const pelititle = option.title ? p.title.includes(option.title) : true;
        const pelitag = option.tag ? p.tags && p.tags.includes(option.tag) : true;
        return pelititle && pelitag;
      });
      return listafiltrada;
    } catch (error) {
      console.log("Error", error);
      throw new Error("Error en la búsqueda.");
    }
  }
}

export { PelisCollection, Peli };

