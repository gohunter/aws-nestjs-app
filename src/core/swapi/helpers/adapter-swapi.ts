import { SwapiFilm, SwapiFilmEs } from '../models';

export const adapterSwapiFilmToEs = (item: SwapiFilm): SwapiFilmEs => {
  return {
    titulo: item.title,
    episodio_id: item.episode_id,
    apertura_crawl: item.opening_crawl,
    director: item.director,
    productor: item.producer,
    fecha_liberacion: item.release_date,
    personajes: item.characters,
    planetas: item.planets,
    naves_espaciales: item.starships,
    vehiculos: item.vehicles,
    especie: item.species,
    fecha_creacion: item.created,
    fecha_edicion: item.edited,
    url: item.url,
  };
};
