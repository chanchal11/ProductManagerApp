const initialState = { 
    products: {data: [], limit: 6, currentPage: 1, total: 0, totalPages: 0}, 
    loading: true,
    search: {
        currentSearchString: ''
    },
    edit: {editIndex: -1,isEdit: false,showEditModal: false},
    delete: {deleteIndex: -1,showDeleteModal: false}

};

export default function productDetailReducer(state = initialState, action) {
  switch (action.type) {
    case "PRODUCT_SET_RESULTS":
        return {
            ...state, products: {...action.payload}
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
            ...state, search: {lastSearchString}
        };

    case "EDITADD_MODAL":
        const {editIndex,isEdit,showEditModal} = action.payload;
        return {
            ...state, edit: {editIndex,isEdit,showEditModal}
        };

    case "AFTER_EDITADD_MODAL":
        const {data} = action.payload;
        if(!state.edit.isEdit)
            state.products.data.push(data);
        // console.log(state);
        return {
            ...state, products: {...state.products,data: state.products.data.map((row,index) => {
                if(index == state.edit.editIndex)
                    return {...data,category: {...data.category}};
                else
                    return row;
            })   
          }
        };    
    
    case "DELETE_MODAL":
        const {deleteIndex,showDeleteModal} = action.payload;
        return {
            ...state, delete: {deleteIndex,isEdit,showDeleteModal}
        };
    
    default:
      return state;
  }

}