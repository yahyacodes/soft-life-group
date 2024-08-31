import "./App.css";
import { Routes, Route } from "react-router-dom";
import Services from "./Components/Services";
import ServiceDetails from "./Components/ServiceDetails";
import ReviewForm from "./Components/ReviewForm";
import ProfileForm from "./Components/ProfileForm";
import ProfileDetails from "./Components/ProfileDetails";
import Navbar from "./Components/Navbar";
import ServicesForm from "./Components/ServicesForm";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import AuthProvider from "./Components/AuthContext";
import PrivateRoute from "./Components/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
      <main>
        <Navbar />
        <div className="mx-auto flex flex-col items-center justify-center">
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/services/create" element={<ServicesForm />} />
            <Route
              path="/service/:serviceId/review"
              element={
                <PrivateRoute>
                  <ReviewForm />
                </PrivateRoute>
              }
            />
            <Route path="/profile/create" element={<ProfileForm />} />
            <Route path="/profile/:id" element={<ProfileDetails />} />
          </Routes>
        </div>
      </main>
    </AuthProvider>
  );
}

export default App;
