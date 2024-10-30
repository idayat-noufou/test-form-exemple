import {isEmpty, forEach} from "lodash";

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
    return text.exec(format)
}

/**
 * Calculate a person age
 * @param {Date} date bithdate
 * @returns {number} The age in years
 */
function calculateAge(date) {
    if (isEmpty(date)) {
        throw new Error("value is empty");
    }
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
    if (!email.test(emailRegex)) {
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
    if (!code.test(format)) {
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

function formErrors(form) {
    let errors = {};
    try {
        textIsValid(form.nom)
    } catch (e) {
        errors.nom = e.message
    }
    try {
        textIsValid(form.prennom)
    } catch (e) {
        errors.prennom = e.message
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
    formErrors
}
