import AppRouter from "../../routers/AppRouter";
import {mount} from "enzyme";
import {AuthContext} from "../../auth/authContext";

describe('tests on <AppRouter/>', ()=>{



    test('should return login if is not authenticated', () => {

        const contextValue = {
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login');


    });


    test('should return marvel component  if it is authenticated', () => {

        const contextValue = {
            user: {
                logged: true,
                name:'Pepe'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        );

        // console.log(wrapper.html());

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBe(true);


    });






});
