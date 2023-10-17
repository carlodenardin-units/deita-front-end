"use client";

import { useState } from "react";

export default function Home() {
    const [inputText, setInputText] = useState("Il paziente Mario Rossi ha 22 anni e vive a Milano. Attualmente si trova nel reparto di cardiologia nella stanza 26. Il medico Baggio inizia l'intervento chirurgico alle ore 15:00 del giorno 17 ottobre 2023. L'intervento si terrà all'Ospedale Maggiore di Trieste."); // Stato per il testo di input
    const [outputText, setOutputText] = useState(""); // Stato per il testo di output
    const [isLoading, setIsLoading] = useState(false); // Stato per mostrare il caricamento

    // Funzione per gestire il click del bottone "de-identifica" e inviare il testo all'API Python
    const handleDeidentify = () => {
        // Esegui qui la richiesta HTTP all'API Python per inviare il testo input
        // Puoi utilizzare fetch o un'altra libreria per le richieste HTTP
        setIsLoading(true); // Mostra il caricamento
        // Esempio di richiesta fetch (assicurati di sostituire l'URL con l'effettivo endpoint dell'API)
        fetch("http://164.90.217.167:8000/api/python/v1", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ text: inputText }), // Invia il testo input come JSON
            headers: {
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Aggiorna lo stato con il testo elaborato dall'API
                let text = data.output.text;
                // Ordina le annotazioni per posizione in modo crescente
                const annotations = data.output.annotations.sort((a: number[], b: number[]) => a[1] - b[1]);

                let transformedText = text;
                let offset = 0;

                annotations.forEach((annotation: [any, any, any, any]) => {
                const [word, start, end, type] = annotation;
                var transformedTextPart = ``;

                if (type == "Address") {
                    transformedTextPart = `<span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">${word} (${type})</span>`
                } else if (type == "Age") {
                    transformedTextPart = `<span class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">${word} (${type})</span>`
                } else if (type == "Date") {
                    transformedTextPart = `<span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">${word} (${type})</span>`
                } else if (type == "Email") {
                    transformedTextPart = `<span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${word} (${type})</span>`
                } else if (type == "Hospital") {
                    transformedTextPart = `<span class="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">${word} (${type})</span>`
                } else if (type == "ID") {
                    transformedTextPart = `<span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${word} (${type})</span>`
                } else if (type == "Initials") {
                    transformedTextPart = `<span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${word} (${type})</span>`
                } else if (type == "Internal_Location") {
                    transformedTextPart = `<span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">${word} (${type})</span>`
                } else if (type == "Name") {
                    transformedTextPart = `<span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">${word} (${type})</span>`
                } else if (type == "Other") {
                    transformedTextPart = `<span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${word} (${type})</span>`
                } else if (type == "Phone") {
                    transformedTextPart = `<span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${word} (${type})</span>`
                } else if (type == "Profession") {
                    transformedTextPart = `<span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${word} (${type})</span>`
                } else if (type == "SSN") {
                    transformedTextPart = `<span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${word} (${type})</span>`
                } else if (type == "Time") {
                    transformedTextPart = `<span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">${word} (${type})</span>`
                } else {
                    transformedTextPart = `<span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${word} (${type})</span>`
                }

                transformedText =
                    transformedText.slice(0, start + offset) +
                    transformedTextPart +
                    transformedText.slice(end + offset);

                    offset += transformedTextPart.length - (end - start);
                });

                setOutputText(transformedText);
                setIsLoading(false); // Nascondi il caricamento
            })
            .catch((error) => {
                console.error("Errore durante la richiesta all'API:", error);
                setIsLoading(false); // Nascondi il caricamento
            });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">deita</span> - deidentifier of italian ehr</h1>
            <br/>
            <div className="grid grid-cols-1 gap-4 relative w-full">
                <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
                    <textarea
                        rows={10}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)} // Aggiorna lo stato con il testo input
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Il paziente Mario Rossi ha 22 anni e vive a Milano."
                    />
                </div>
                

                {!isLoading ? (
                    <button
                        type="button"
                        onClick={handleDeidentify} // Gestisci il click del bottone
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        De-identifica
                    </button>
                ) : (
                    <button
                        disabled
                        type="button"
                        onClick={handleDeidentify} // Gestisci il click del bottone
                        className="disabled:pointer-events-none text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >   
                        <center>
                        <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                        </center>
                        
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4 relative w-full">
                <div className="max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">BiLSTM-CRF</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{__html: outputText}}></p>
                </div>
                <div className="max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">CRF</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{__html: outputText}}></p>
                </div>
            </div>
        </main>
    );
}