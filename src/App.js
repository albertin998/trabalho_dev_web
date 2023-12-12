import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LivroListagem from "./Pagina/Principal/LivroListagem";



function App() {

  return (

    <BrowserRouter >
      <Routes>
        <Route exact path="/" element={<LivroListagem />} />      
      </Routes>
    </BrowserRouter>
  );
}

export default App;