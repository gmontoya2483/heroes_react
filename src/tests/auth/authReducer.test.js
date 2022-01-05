import {authReducer} from "../../auth/authReducer";
import {types} from '../../types/types'


describe('Tests on authReducer', ()=> {

    test('should return the default state', () => {

        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});

    });


    test('should authenticate and place the users name', ()=> {

        const action = {
            type: types.login,
            payload: {
                name: 'Gabriel'
            }
        }

        const state = authReducer({logged: false}, action);

        expect(state).toEqual({
            logged: true,
            name: 'Gabriel'
        });

    });




    test('should logout and remove the users name', ()=> {

        const initialState = {
            logged: true, name: 'Gabriel'
        };

        const action = {
            type: types.logout
        };

        const state = authReducer(initialState, action);

        expect(state).toEqual({
            logged: false
        });

    });

})
