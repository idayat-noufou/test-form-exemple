import {isEmpty, forEach} from "lodash";
import log from "eslint-plugin-react/lib/util/log.js";

/**
 * Verify if text field is valid
 * @param {string} text
 * @returns {boolean}
 */
function textIsValid(text) {
    if (isEmpty(text)) {
        throw new Error('value is empty')
    }
    const char = hasSpecialCharacters(text)
    if (char) {
        throw new Error(char + 'is not a permitted character')
    }
    return true
}

/**
 * return first special character or number of a string except accents, umlauts, hyphens
 * @param text
 * @returns {RegExpExecArray}
 */
function hasSpecialCharacters(text) {
    const format = /[ `!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~0-9]/;
    return format.exec(text)
}

/**
 * Calculate a person age
 * @param {string} date bithdate
 * @returns {number} The age in years
 */
function calculateAge(date) {
    if (isEmpty(date)) {
        throw new Error("value is empty");
    }
    date = new Date(date)
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error("date format not valid");
    }
    let dateDiff = new Date(Date.now() - date.getTime());
    return Math.abs(dateDiff.getUTCFullYear() - 1970)
}

/**
 * verify if calculated age from date is over 18
 * @param date
 * @returns {boolean}
 */
function dateIsValid(date) {
    try {
        const age = calculateAge(date)
        if (age < 18) {
            throw new Error("age must be over 18")
        }
        return true
    } catch (e) {
        throw e;
    }
}

/**
 * verify if email is valid
 * @param {string} email
 * @returns {boolean}
 */
function emailIsValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("email is not valid")
    }
    return true
}

/**
 * verify if code is a valid France postal code
 * @param {string} code
 */
function postalCodeisValid(code) {
    const format = /^[0-9]{5}$/;
    if (!format.test(code)) {
        throw new Error("postal code is not valid")
    }
}

/**
 * verify if all value of an object are not null
 * @param {object} form
 */
function canSubmit(form) {
    let submit = true;
    forEach(form, (elem) => {
        if (isEmpty(elem)) {
            submit = false
            return submit
        }
    })
    return submit
}

/**
 * Validate a form object and return a list of errors
 * @param {object} form - The form data object to validate
 * @param {string} form.nom - The user's last name
 * @param {string} form.prenom - The user's first name
 * @param {string} form.ville - The user's city
 * @param {string} form.email - The user's email address
 * @param {Date} form.date - The user's birthdate
 * @param {string} form.code - The user's postal code
 * @returns {object} An object containing error messages for each invalid field
 */
function formErrors(form) {
    let errors = {};
    try {
        textIsValid(form.nom)
    } catch (e) {
        errors.nom = e.message
    }
    try {
        textIsValid(form.prenom)
    } catch (e) {
        errors.prenom = e.message
    }
    try {
        textIsValid(form.ville)
    } catch (e) {
        errors.ville = e.message
    }
    try {
        emailIsValid(form.email)
    } catch (e) {
        errors.email = e.message
    }
    try {
        dateIsValid(form.date)
    } catch (e) {
        errors.date = e.message
    }
    try {
        postalCodeisValid(form.code)
    } catch (e) {
        errors.code = e.message
    }

    return errors;
}

export {
    canSubmit,
    formErrors,
    textIsValid,
    dateIsValid,
    emailIsValid,
    calculateAge,
    hasSpecialCharacters,
    postalCodeisValid
}
