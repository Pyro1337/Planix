import { Route, Routes } from "react-router-dom";
import { tableroRoutes } from "../modules/tablero/handlers/routes";
import { espacioTrabajoRoutes } from "../modules/espacioTrabajo/handlers/routes";
import { miembrosRoutes } from "../modules/miembro/handlers/routes";

const routes = [...tableroRoutes, ...espacioTrabajoRoutes, ...miembrosRoutes];

export const RootRoutes = () => {
  return (
    <Routes>
      {routes.map((route, idx) => (
        <Route key={idx} {...route} />
      ))}
    </Routes>
  );
};
