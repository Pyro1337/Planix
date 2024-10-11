import { Provider } from "react-redux";
import "./App.css";
import { Screen } from "./modules/app/components/Screen";
import { AppPage } from "./modules/app/pages/AppPage";
import { authRoutes } from "./modules/auth/handlers/routes";
import { Route, Routes } from "react-router-dom";
import { browserHistory, rootStore } from "./root/rootStore";
import { ReduxRouter } from "@lagunovsky/redux-react-router";
import { ToastContainer } from "react-toastify";

const routes = [...authRoutes];

function App() {
  return (
    <>
      <Provider store={rootStore}>
        <ReduxRouter history={browserHistory} store={rootStore}>
          <Screen>
            <Routes>
              {routes.map((route, idx) => (
                <Route key={idx} {...route} />
              ))}
              <Route path={"/*"} element={<AppPage />} />
            </Routes>
          </Screen>
        </ReduxRouter>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
