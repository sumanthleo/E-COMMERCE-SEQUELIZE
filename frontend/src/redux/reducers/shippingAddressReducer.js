import { ADD_SHIPPING_ADDRESS } from "../constants";

const initialState = {
    shippingAddressData: {},
    isShippingAddressAdded : false
};   

export const shippingAddressReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_SHIPPING_ADDRESS:
        return {...state, shippingAddressData: action.payload, isShippingAddressAdded: true };
      default:
        return state;
    }
};