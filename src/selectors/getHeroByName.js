import {heroes} from "../data/heroes";

export const getHeroByName = (name = '') =>{

    // console.log('Busqueda....')
    name = name.trim().toLowerCase();
    if(name === '') return [];

    return heroes.filter(hero => hero.superhero.trim().toLowerCase().includes(name));

}
