import "./App.css";
import Cronometro from "./components/Cronometro";
import Footer from "./components/Footer";
import Tarefas from "./components/Tarefas";

function App() {
  return (
    <div className="app-container">
      <div className="content">
        <Cronometro />
        <Tarefas />
      </div>
      <Footer />
    </div>
  );
}

export default App;
