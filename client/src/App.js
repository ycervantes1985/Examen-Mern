
import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Main from './views/Main';
import Detail from './views/Detail';
import Update from './views/Update';
import NewReview from './views/NewReview';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/cars/:id" element={<Detail></Detail>}></Route>
        <Route path="/cars/edit/:id" element={<Update></Update>} ></Route>
        <Route path="/cars/add-review/:idCar" element={<NewReview />}></Route>
      </Routes>

    </div>
  );
}

export default App;
