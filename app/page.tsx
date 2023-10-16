"use client";

import { useState } from "react";

export default function Home() {
    const [inputText, setInputText] = useState(""); // Stato per il testo di input
    const [outputText, setOutputText] = useState(""); // Stato per il testo di output

    // Funzione per gestire il click del bottone "de-identifica" e inviare il testo all'API Python
    const handleDeidentify = () => {
        // Esegui qui la richiesta HTTP all'API Python per inviare il testo input
        // Puoi utilizzare fetch o un'altra libreria per le richieste HTTP

        // Esempio di richiesta fetch (assicurati di sostituire l'URL con l'effettivo endpoint dell'API)
        fetch("/api/python/ehr", {
            method: "POST",
            body: JSON.stringify({ text: inputText }), // Invia il testo input come JSON
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Aggiorna lo stato con il testo elaborato dall'API
                console.log(data)
                setOutputText(data.output);
            })
            .catch((error) => {
                console.error("Errore durante la richiesta all'API:", error);
            });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="grid grid-cols-1 gap-2 relative w-full">
                <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
                    <textarea
                        rows={10}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)} // Aggiorna lo stato con il testo input
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Il paziente Mario Rossi ha 22 anni e vive a Milano."
                    />
                </div>
                <button
                    type="button"
                    onClick={handleDeidentify} // Gestisci il click del bottone
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    de-identifica
                </button>
                <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
                    <textarea
                        rows={10}
                        value={outputText} // Mostra il testo elaborato dall'API
                        disabled
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>
        </main>
    );
}