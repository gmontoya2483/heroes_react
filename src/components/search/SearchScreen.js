import {useForm} from "../../hooks/useForm";
import {getHeroByName} from "../../selectors/getHeroByName";
import {useMemo} from "react";
import HeroCard from "../hero/HeroCard";
import {useNavigate, useLocation} from "react-router-dom";
import queryString from'query-string'

export const SearchScreen = () => {

    const navigate = useNavigate()
    const location = useLocation()


    const { q = '' } = queryString.parse(location.search)



    const [ formValues, handleInputChange, reset ] = useForm({
        searchText: q
    } );

    const { searchText } = formValues
    const filteredHeroes = useMemo(() => getHeroByName(q), [q]);


    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${ searchText }`)
    }

    return (
        <>
            <h1>Search</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search</h4>
                    <hr/>
                    <form onSubmit={ handleSearch }>
                        <input
                            type="text"
                            placeholder={'Buscar un heroe'}
                            className={'form-control'}
                            name="searchText"
                            autoComplete={'off'}
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <div className="d-grid gap-2  mt-1">
                            <button
                                type={'submit'}
                                className={'btn btn-outline-primary'}
                            >
                                Buscar...

                            </button>
                        </div>

                    </form>
                    
                </div>
                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr/>

                    {
                        (q === '')
                            ? <div className={'alert alert-info'}>Buscar un Heroe... </div>
                            : (filteredHeroes.length === 0) && <div className={'alert alert-danger'}>No hay resultados: { q }</div>
                    }

                    {
                        filteredHeroes.map( (hero) =>(
                            <HeroCard
                                key={hero.id}
                                { ...hero }
                            />
                        ))
                    }



                </div>
            </div>

        </>
    );
};
