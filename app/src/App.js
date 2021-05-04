import React from "react";
import Header from "./components/Header";

/** We are importing our index.php myApp variable */
import myApp from 'myApp';

console.log(myApp);

/* globals __webpack_public_path__ */
__webpack_public_path__ = `${window.STATIC_URL}/static/assets/js/`;

console.log(__webpack_public_path__)

function App() {
    const { user: { name, email }, logged } = myApp;
    return (
        <>
            <Header />
            <main>
                <div className="container">
                    {logged &&
                        <h2 className="status">Logged In</h2>
                    }
                    <h1 className="title">{name}</h1>
                    <p className="description">{email}</p>
                    <p className="description">API host variable {__API_HOST__}</p>
                    <p className="description">DEV {__DEV__ ? "TRUE" : "FALSE"} </p>
                    <h1>Hello World!</h1>
                </div>
            </main>
        </>
    );
}

export default App;
