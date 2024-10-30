import {useEffect, useState} from "react";
import {canSubmit, formErrors} from "../validator/validator";
import {isEmpty} from "lodash";

export const Formulaire = () => {
    let [formFields,setFormField] = useState({
        nom:null,
        prenom:null,
        email:null,
        date:null,
        ville:null,
        code:null,
    })
    let [btnCanSubmit, setBtnCanSubmit] = useState(false);
    useEffect(() => {
        setBtnCanSubmit(canSubmit(formFields))
    }, [formFields]);
    console.log(btnCanSubmit)

    return (
        <form className={"bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 "} onSubmit={
            (e)=>{
                e.preventDefault();
                const errors = formErrors(formFields);
                if (!isEmpty((errors))){
                    console.log(errors)
                    return false;
                }
                console.log('save')
        }}>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label>nom</label>
                <input className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"} type="text"
                       name="nom"
                       onInput={(v) => {
                           let change = {nom: v.target.value};
                           setFormField(form => ({
                               ...formFields,
                               ...change
                           }))
                       }}/>
            </div>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label>prénom</label>
                <input className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"} type="text"
                       name="prenom"
                       onInput={(v) => {
                           let change = {prenom: v.target.value};
                           setFormField(form => ({
                               ...formFields,
                               ...change
                           }))
                       }}/>
            </div>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label>email</label>
                <input className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"} type="email"
                       name="email"
                       onInput={(v) => {
                           let change = {email: v.target.value};
                           setFormField(form => ({
                               ...formFields,
                               ...change
                           }))
                       }}/>
            </div>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label>date de naissance</label>
                <input className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"} type="date"
                       name="date"
                       onInput={(v) => {
                           let change = {date: v.target.value};
                           setFormField(form => ({
                               ...formFields,
                               ...change
                           }))
                       }}/>
            </div>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label>ville</label>
                <input className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"} type="text"
                       name="ville"
                       onInput={(v) => {
                           let change = {ville: v.target.value};
                           setFormField(form => ({
                               ...formFields,
                               ...change
                           }))
                       }}/>
            </div>
            <div className={"grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"}>
                <label>code postal</label>
                <input className={"h-10 border mt-1 rounded px-4 w-full bg-gray-50"} type="text"
                       name="code"
                       onInput={(v) => {
                           let change = {code: v.target.value};
                           setFormField(form => ({
                               ...formFields,
                               ...change
                           }))
                       }}/>
            </div>
            <button
                className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200"}
                disabled={!btnCanSubmit}
                type="submit">Sauvegarder
            </button>
        </form>
    )
}
