import {mount} from "enzyme";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {HeroScreen} from "../../../components/hero/HeroScreen";
import {LoginScreen} from "../../../components/login/LoginScreen";



const mockNavigate = jest.fn();

jest.mock('react-router-dom', ()=> ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));


describe('Pruebas en <HeroScreen />', () => {


    test('no debe de mostrarse el HeroScreen sino hay un heroe en el URL', ()=> {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen />}/>
                    <Route path="/" element={<h1>No Hero Page</h1>}/>
                </Routes>
            </MemoryRouter>

        );

        expect( wrapper.find('h1').text().trim()).toBe('No Hero Page')

    });


    test('debe de mostrarse el HeroScreen correctament', ()=> {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />}/>
                    <Route path="/" element={<h1>No Hero Page</h1>}/>
                </Routes>
            </MemoryRouter>

        );

        expect( wrapper).toMatchSnapshot();
        expect( wrapper.find('h3').text().trim()).toBe('Spider Man')

    });


    test('debe de regrasar a la pantalla anterior', ()=> {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />}/>
                </Routes>
            </MemoryRouter>

        );

        wrapper.find('button').prop('onClick')();
        expect(mockNavigate).toHaveBeenCalledWith(-1);


    });



    test('No debe de mostrarse el HeroScreen si no lo encuentra', ()=> {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />}/>
                    <Route path="/" element={<h1>No Hero Page</h1>}/>
                </Routes>
            </MemoryRouter>

        );

        expect( wrapper.find('h1').text().trim()).toBe('No Hero Page')

    });


});
