import './App.css';
import Router from "./routes/index";
import {Suspense} from 'react'
function App() {
  return (
    <div className="App">
      <Suspense>
        <Router/>
      </Suspense>
    </div>
  );
}

export default App;
