import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "../redux/index";
import { thunk } from "redux-thunk";
const customMiddleware = (store) => (next) => (action) => {
  // Implement your custom middleware logic here
  return next(action);
};
// const store = configureStore(
//   reducers,
//   compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension
//       ? window.devToolsExtension()
//       : function (f) {
//           return f;
//         }
//   )
// );

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware, thunk),
});
// sagaMiddleware.run(rootSagas)

export default store;
