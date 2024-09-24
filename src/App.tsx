import { useNavigate } from "react-router-dom";
import HarryPotterLogo from "./assets/harry_potter.svg";
import AppProvider from "./context/AppProvider";
import AppRoutes from "./routes/Routes";

function App() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#232323] min-h-screen">
      <img
        alt="Harry Potter Logo"
        src={HarryPotterLogo}
        className="w-full h-48 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </div>
  );
}

export default App;
