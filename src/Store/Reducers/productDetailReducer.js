const initialState = { 
    products: {data: [], limit: 5, currentPage: 1, total: 0, totalPages: 0}, 
    loading: true,
    search: {
        currentSearchString: '',
        lastSearchString: ''
    }

};

export default function productDetailReducer(state = initialState, action) {
  switch (action.type) {
    case "PRODUCT_ADD":
        const {data,previousPage, currentPage, nextPage, total, totalPages, limit } = action.payload;
        return {
            ...state, products: {data,previousPage, currentPage, nextPage, total, totalPages, limit}
        };

    case "PRODUCT_SET_LOADING":
        return {
            ...state, loading: true
        };
    case "PRODUCT_RESET_LOADING":
        return {
            ...state, loading: false
        };
    case "PRODUCT_SET_LAST_SEARCH":
        const {lastSearchString} = action.payload;
        return {
            ...state, search: {...state.search,lastSearchString}
        };
    case "PRODUCT_SET_CURRENT_SEARCH":
        const {currentSearchString} = action.payload;
        return {
            ...state, search: {...state.search,currentSearchString}
        };

    default:
      return state;
  }

}