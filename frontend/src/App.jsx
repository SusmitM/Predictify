import "./App.css";

import { AllRoutes } from "./routes/AllRoutes";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <AllRoutes />
      </div>
    </>
  );
}

export default App;
