import React, { useEffect, useState } from 'react';

export const RegisteredList = () => {
    const [registeredData, setRegisteredData] = useState([]);

    useEffect(() => {
        const data = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('personne')) {
                data.push(JSON.parse(localStorage.getItem(key)));
            }
        }
        setRegisteredData(data);
    }, []);

    return (
        <div className="container max-w-screen-lg mx-auto bg-white rounded shadow-lg p-4">
            <h2 className="mb-4 text-lg font-bold">Liste des inscrits</h2>
            {registeredData.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Nom</th>
                        <th className="border border-gray-300 px-4 py-2">Prénom</th>
                        <th className="border border-gray-300 px-4 py-2">Ville</th>
                        <th className="border border-gray-300 px-4 py-2">Code Postal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {registeredData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{item.nom || '-'}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.prenom || '-'}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.ville || '-'}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.code || '-'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun inscrit pour le moment.</p>
            )}
        </div>
    );
};
