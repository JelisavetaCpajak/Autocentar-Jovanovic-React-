import { createStore } from "redux";
import reducer from "./store/reducer";
import { Provider, connect } from "react-redux";

const store = createStore(reducer);
<Provider store={store}>
  <App />
</Provider>;
//reducer
initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "":
      return {
        ...state,
        nesto: action.nesto,
      };

    default:
      return state;
  }
};

export default reducer;

//adding mapStateToProps i mapDispatchToProps

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setData: (data) => dispatch({ type: "type", data: data }) };
};

//export default connect(mapStateToProps,mapDispatchToProps)(ClassName)
