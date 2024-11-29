import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
