import {SearchScreen} from "../../../components/search/SearchScreen";
import {mount} from "enzyme";
import {MemoryRouter} from "react-router-dom";


const mockNavigate = jest.fn();

jest.mock('react-router-dom', ()=> ({
  ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));


describe('Pruebas en <Search Screen />', ()=> {

    test('Se debe de mostrar correctamente con valores por defecto', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un Heroe...')


    });


    test('debe de mostrar a Batman y el input con el valor del queryString', ()=> {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('input').prop('value').trim()).toBe('batman');

    });


    test('debe de mostrar un error si no existe el superheroe', ()=> {

        const searchTerm = 'yuyuyuy'

        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${ searchTerm }`]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-danger').text().trim()).toBe(`No hay resultados: ${ searchTerm }`)

    });


    test('se debe de llamar a funcion navigate al nuevo url', ()=> {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        });

        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman');


    });


});
