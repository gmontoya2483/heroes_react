import {mount} from "enzyme";
import {AuthContext} from "../../../auth/authContext";
import {MemoryRouter, Route, Routes} from "react-router-dom";

import {LoginScreen} from "../../../components/login/LoginScreen";
import {types} from "../../../types/types";


const mockNavigate = jest.fn();

jest.mock('react-router-dom', ()=> ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));



describe('Pruebas en el <LoginScreen />', ()=> {



    const contextValue = {
        user: {
            logged: false
        },
        dispatch: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<LoginScreen />}/>
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>

    )

    // <LoginScreen/>

    beforeEach( ()=> {
        jest.clearAllMocks();
    } )



    test('debe de mostrarse correctamnte', ()=> {

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login')

    });


    test('debe de realizar el dispatch y la navegacion sin LocalStorage', ()=> {


        const action = {
            type: types.login,
            payload: {
                name: 'Gabriel'
            }
        }

        wrapper.find('button').simulate('click');
        expect (contextValue.dispatch).toHaveBeenCalledWith(action);


        expect( mockNavigate ).toHaveBeenCalledWith('/marvel',  {replace: true});


    });


    test('debe de realizar el dispatch y la navegacion con LocalStorage', ()=> {


        const action = {
            type: types.login,
            payload: {
                name: 'Gabriel'
            }
        }

        localStorage.setItem('lastPath', '/dc');

        wrapper.find('button').simulate('click');
        expect (contextValue.dispatch).toHaveBeenCalledWith(action);
        expect( mockNavigate ).toHaveBeenCalledWith('/dc',  {replace: true});

    });


});
