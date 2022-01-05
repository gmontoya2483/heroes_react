import {useParams, Navigate, useNavigate} from "react-router-dom";
import {getHeroById} from "../../selectors/getHeroById";
import { useMemo } from "react";
import {heroImages} from "../../helpers/heroImages";
// import batman from '../../assets/dc-batman.jpg'  // Importación estática
// const heroImages = require.context('../../assets', true)



export const HeroScreen = () => {

    const navigate = useNavigate();
    const { heroeId } = useParams();

    const hero = useMemo(()=> getHeroById(heroeId),[ heroeId ]);

    if(!hero) {
        return <Navigate to={'/'} />
    }

    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;


    const handleReturn = () => {
        navigate( -1 );
    }


    // const imagePath = `/assets/${ id }.jpg` // Public folder

    return (
        <div className={'row mt-5'}>
            <div className="col-4">
                <img
                    className={'img-thumbnail animate__animated animate__fadeInLeft'}
                    // src={ imagePath } // Public folder
                    // src ={ batman } // Importacion estática
                    src={ heroImages(`./${ id }.jpg`)}
                    alt={ superhero }
                />
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{ superhero }</h3>
                <ul className={'list-group list-group-flush'}>
                    <li className={'list-group-item'}>
                        <strong>Alter ego:</strong> { alter_ego }
                    </li>

                    <li className={'list-group-item'}>
                        <strong>Publisher:</strong> { publisher }
                    </li>

                    <li className={'list-group-item'}>
                        <strong>First Appearance:</strong> { first_appearance }
                    </li>
                </ul>

                <h5 className={'mt-3'}>Characters</h5>
                <p>{ characters }</p>

                <button
                    className={'btn btn-outline-info'}
                    onClick={ handleReturn }
                >
                    Return
                </button>

            </div>


        </div>
    );
};
