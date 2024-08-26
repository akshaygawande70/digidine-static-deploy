import { Routes, Route, Outlet } from "react-router-dom";
import routes from "@/routes";

export function Customer() {
  return (
    <div className="min-h-screen bg-blue-gray-100/60">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "customer" &&
            pages.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={element}
              />
            ))
        )}
      </Routes>
      <div className="text-blue-gray-600">
        {/* Content for CustomerItemsList */}
      </div>
    </div>
  );
}

Customer.displayName = "Customer";

export default Customer;
