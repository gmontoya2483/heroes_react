import {DashboardRoutes} from "../../routers/DashboardRoutes";
import {mount} from "enzyme";
import {AuthContext} from "../../auth/authContext";
import { MemoryRouter } from "react-router-dom";





describe('Test on <DashBoardRoutes', ()=> {

    const contextValue = {
        user: {
            logged: true,
            name: 'Juanito'
        }

    }

    test('should be shown correctly - default Route (Marvel)', () => {

        const wrapper = mount(

            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>


        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Juanito');
        expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen');


    });


    test('should be shown correctly - DC', () => {

        const wrapper = mount(

            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/dc']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>


        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('DCScreen');


    });

});
