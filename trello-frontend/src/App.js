import "./App.css";
import { Screen } from "./modules/app/components/Screen";
import { AppPage } from "./modules/app/pages/AppPage";
import { authRoutes } from "./modules/auth/handlers/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const routes = [...authRoutes];

function App() {
  return (
    <BrowserRouter>
      <Screen>
        <Routes>
          {routes.map((route, idx) => (
            <Route key={idx} {...route} />
          ))}
          <Route path={"/*"} element={<AppPage />} />
        </Routes>
      </Screen>
    </BrowserRouter>
  );
}

export default App;
