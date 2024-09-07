import { Route, Routes } from "react-router-dom";

const routes = [];

export const RootRoutes = () => {
  return (
    <Routes>
      {routes.map((route, idx) => (
        <Route key={idx} {...route} />
      ))}
    </Routes>
  );
};
