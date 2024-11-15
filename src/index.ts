import minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

async function parseaParams(argv) {
  const resultado = minimist(argv);
  const pelicontroller = new PelisController();

  try {
    if (resultado.id) {
      const peli = await pelicontroller.get({ id: resultado.id });
      if (peli) {
        console.log("Peli encontrada:", peli);
      } else {
        console.log("Peli no encontrada");
      }
    } else if (resultado.title || resultado.tag) {
      const searchOption = {
        title: resultado.title,
        tag: resultado.tag,
      };
      const results = await pelicontroller.get({ search: searchOption });
      console.log("Resultados de búsqueda:", results);
    } else if (resultado.add) {
      let nuevapeli: Peli;

      try {
        nuevapeli = JSON.parse(resultado.add);
      } catch (error) {
        console.log("Error al parsear el objeto add:", error);
        return;
      }

      if (nuevapeli.id && nuevapeli.title && nuevapeli.tags) {
        const result = await pelicontroller.get({ add: nuevapeli });
        console.log(result ? "Película agregada con éxito." : "No se pudo agregar la película.");
      } else {
        console.log("Faltan parámetros para agregar la película.");
      }
    } else {
      const allmovies = await pelicontroller.get();
      console.log("Todas las pelis:", allmovies);
    }
  } catch (error) {
    console.error("Ocurrió un error:", error);
  }

  return resultado;
}

async function main() {
  const params = await parseaParams(process.argv.slice(2));
  console.log(params);
}

main();
