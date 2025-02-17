import { useEffect, useState } from 'react';

export const RegisteredList = () => {
    const [registeredData, setRegisteredData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json(); // Récupération des données JSON
                setRegisteredData(data);
            } catch (err) {
                setError(err.message); // Capture de l'erreur
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container max-w-screen-lg mx-auto bg-white rounded shadow-lg p-4">
            <h2 className="mb-4 text-lg font-bold">Liste des inscrits</h2>
            {error ? (
                <p className="text-red-500">Erreur : {error}</p>
            ) : registeredData.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Nom</th>
                        <th className="border border-gray-300 px-4 py-2">Prénom</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Ville</th>
                        <th className="border border-gray-300 px-4 py-2">Code Postal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {registeredData.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{item.nom || '-'}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.prenom || '-'}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.email || '-'}</td>
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
