export const ADD = (item) => {
    return {
        type: "ADD_CART",
        payload: item
    }
}

export const DELETE = (id) => {
    return {
        type: "DELETE_CART",
        payload: id
    }
}

export const DELONE = (item) => {
    return {
        type: "DELETE_ONE",
        payload: item
    }
}