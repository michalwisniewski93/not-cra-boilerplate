const initialState = {
    permission: false,
    activeDoctorsProfile: {
        name: null,
        surname: null,
        accesscode: null,
        pwz: null,
        phonenumber: null,
        address: null,
    } 
}



function reducer(state=initialState, action){
    switch(action.type){
        case 'CHANGE_PERMISSION':
            return {...state, permission: !state.permission}
    }
}

export default reducer;