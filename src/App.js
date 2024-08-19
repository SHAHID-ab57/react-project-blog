
import { useState } from 'react';
import './App.css';
import Header from './Layout/Header/Header';
import Routing from './Routing/Routing';
import { Provider} from 'react-redux';
import Store from './StorageRedux/Store';

function App() {
let [isDarkMode,setIsDarkMode]=useState(false)

let DarkButtonHandler = ()=>{
  setIsDarkMode(pre=>!pre)
}

// console.log("Dark Mode State",isDarkMode);
  return (
    <div className={`${isDarkMode?"dark":"light"}`}>
      <Provider store={Store}>
      <Routing isDarkMode={isDarkMode} DarkButtonHandler={DarkButtonHandler}/>
      </Provider>
    </div>
  );
}

export default App;
