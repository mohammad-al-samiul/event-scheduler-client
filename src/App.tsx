import { Toaster } from "react-hot-toast";
import "./App.css";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Home />
    </>
  );
}

export default App;
