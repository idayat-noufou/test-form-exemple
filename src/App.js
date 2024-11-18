import './App.css';
import {Formulaire} from "./component/Formulaire/Formulaire.jsx";
import {RegisteredList} from "./component/RegisteredList/RegisteredList.jsx";



function App() {
    return (
        <div className="App min-h-screen p-6 bg-gray-100">
            {/*nom, prénom, mail, date de naissance, ville, code postal et un bouton de sauvegarde*/}
            <div>
                <h2 data-testid="inscription">Inscription</h2><br/>
                <div className={"container max-w-screen-lg mx-auto"}>
                    <Formulaire/>
                </div>
            </div>
            <div>
                <h2>Liste inscrits</h2><br/>
                <div className={"container max-w-screen-lg mx-auto"}>
                    <RegisteredList/>
                </div>
            </div>
        </div>
    );
}

export default App;
