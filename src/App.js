import './App.css';
import Header from "./components/Header/Header";
import {useTelegram} from "./hooks/useTelegram";
import {useEffect} from "react";

import {Route, Routes} from "react-router-dom";
import Form from "./components/Form/Form";


function App() {

  const {tg} = useTelegram();

  useEffect(() => {
      tg.ready();
  },[tg])
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path={'form'} element={<Form/>} />
        </Routes>
    </div>
  );
}

export default App;
