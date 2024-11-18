import {Formulaire} from "./component/Formulaire/Formulaire.jsx";
// import {RegisteredList} from "./component/RegisteredList";
import './App.css'
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <>
        <Toaster />
      <div className="App min-h-screen p-6 bg-gray-100">
            {/*nom, prénom, mail, date de naissance, ville, code postal et un bouton de sauvegarde*/}
            <div data-testid="inscription">
                <h2>Inscription</h2><br/>
                <div className={"container max-w-screen-lg mx-auto"}>
                    <Formulaire/>
                </div>
            </div>
            {/*<div>*/}
            {/*    <h2>Liste inscrits</h2><br/>*/}
            {/*    <div className={"container max-w-screen-lg mx-auto"}>*/}
            {/*        <RegisteredList/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
    </>
  )
}

export default App
