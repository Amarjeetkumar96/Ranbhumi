import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { publicRoutes, protectedUserRoutes, protectedAdminRoutes } from "./routes.jsx";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex flex-col min-h-screen bg-slate-900 text-white">
        <Navbar />
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            {publicRoutes.map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}

            <Route element={<ProtectedRoute allowRoles={["user", "admin"]} />}>
              {protectedUserRoutes.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
            </Route>

            <Route element={<ProtectedRoute allowRoles={["admin"]} />}>
              {protectedAdminRoutes.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;