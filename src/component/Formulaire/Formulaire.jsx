import { useEffect, useState } from "react";
import { canSubmit, formErrors } from "../../validator/validator.js";
import { isEmpty } from "lodash";
import toast from "react-hot-toast";
import { FormError } from "../FormError/FormError.jsx";

export const Formulaire = () => {
    let [formFields, setFormField] = useState({
        nom: null,
        prenom: null,
        email: null,
        date: null,
        ville: null,
        code: null,
    });
    let [btnCanSubmit, setBtnCanSubmit] = useState(false);
    let [errors, setErrors] = useState([]);

    useEffect(() => {
        setBtnCanSubmit(canSubmit(formFields));
    }, [formFields]);

    const submitForm = async () => {
        const errors = formErrors(formFields);
        if (!isEmpty(errors)) {
            setErrors(errors);
            toast.error("Erreur, veuillez ressaisir les éléments");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formFields),
            });

            if (response.ok) {
                toast.success("Les informations ont bien été enregistrées");
                setFormField({
                    nom: null,
                    prenom: null,
                    email: null,
                    date: null,
                    ville: null,
                    code: null,
                });
            } else {
                toast.error("Erreur lors de l'enregistrement de l'utilisateur");
            }
        } catch (error) {
            toast.error("Erreur réseau, veuillez réessayer");
        }
    };

    return (
        <form
            className={"bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 "}
            onSubmit={(e) => {
                e.preventDefault();
                submitForm();
            }}
        >
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label htmlFor="nom">nom</label>
                <input
                    className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"}
                    type="text"
                    id="nom"
                    data-testid="nom"
                    name="nom"
                    onInput={(v) => {
                        let change = { nom: v.target.value };
                        setFormField((form) => ({
                            ...formFields,
                            ...change,
                        }));
                    }}
                />
                <FormError error={errors.nom}></FormError>
            </div>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label htmlFor="prenom">prénom</label>
                <input
                    className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"}
                    type="text"
                    id="prenom"
                    data-testid="prenom"
                    name="prenom"
                    onInput={(v) => {
                        let change = { prenom: v.target.value };
                        setFormField((form) => ({
                            ...formFields,
                            ...change,
                        }));
                    }}
                />
                <FormError error={errors.prenom}></FormError>
            </div>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label htmlFor="email">email</label>
                <input
                    className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"}
                    type="email"
                    id="email"
                    data-testid="email"
                    name="email"
                    onInput={(v) => {
                        let change = { email: v.target.value };
                        setFormField((form) => ({
                            ...formFields,
                            ...change,
                        }));
                    }}
                />
                <FormError error={errors.email}></FormError>
            </div>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label htmlFor="date">date de naissance</label>
                <input
                    className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"}
                    type="date"
                    id="date"
                    data-testid="date"
                    name="date"
                    onInput={(v) => {
                        let change = { date: v.target.value };
                        setFormField((form) => ({
                            ...formFields,
                            ...change,
                        }));
                    }}
                />
                <FormError error={errors.date}></FormError>
            </div>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label htmlFor="ville">ville</label>
                <input
                    className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"}
                    type="text"
                    id="ville"
                    data-testid="ville"
                    name="ville"
                    onInput={(v) => {
                        let change = { ville: v.target.value };
                        setFormField((form) => ({
                            ...formFields,
                            ...change,
                        }));
                    }}
                />
                <FormError error={errors.ville}></FormError>
            </div>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label htmlFor="code">code postal</label>
                <input
                    className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"}
                    type="text"
                    id="code"
                    data-testid="code"
                    name="code"
                    onInput={(v) => {
                        let change = { code: v.target.value };
                        setFormField((form) => ({
                            ...formFields,
                            ...change,
                        }));
                    }}
                />
                <FormError error={errors.code}></FormError>
            </div>
            <button
                className={
                    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200"
                }
                disabled={!btnCanSubmit}
                type="submit"
            >
                Sauvegarder
            </button>
        </form>
    );
};
