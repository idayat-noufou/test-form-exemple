import {
    textIsValid,
    hasSpecialCharacters,
    calculateAge,
    dateIsValid,
    emailIsValid,
    postalCodeisValid,
    canSubmit,
    formErrors
} from './validator';
import {jest} from "@jest/globals";


/**
 * @function textIsValid
 */
describe('textIsValid', () => {
    it('text passes validation', () => {
        expect(textIsValid('ValidText')).toBe(true);
    });

    it('text is empty: should throw error', () => {
        expect(() => textIsValid('')).toThrow('value is empty');
    });

    it('text has special characters: should throw error', () => {
        expect(() => textIsValid('Invalid!Text')).toThrow('!is not a permitted character');
    });
});

/**
 * @function hasSpecialCharacters
 */
describe('hasSpecialCharacters', () => {
    it('returns null for valid text', () => {
        expect(hasSpecialCharacters('ValidText')).toBeNull();
    });

    it('returns first special character for invalid text', () => {
        expect(hasSpecialCharacters('Invalid!Text')).toEqual(expect.any(Object));
    });
});

/**
 * @function calculateAge
 */
describe('calculateAge', () => {
    mockDate() // now = 14 juillet 2036

    it('calculates age correctly', () => {
        const birthdate ='2010-06-15';
        expect(calculateAge(birthdate)).toEqual(26);

        const birthdate2 ='2030-06-15';
        expect(calculateAge(birthdate2)).toEqual(6);
    });

    it('throws error for empty date', () => {
        expect(() => calculateAge('')).toThrow('value is empty');
    });

    it('throws error for invalid date', () => {
        expect(() => calculateAge('invalid-date')).toThrow('date format not valid');
    });
});

/**
 * @function dateIsValid
 */
describe('dateIsValid', () => {
    mockDate() // now = 14 juillet 2036

    it('returns true for age over 18', () => {
        const birthdate = '2000-06-15'
        expect(dateIsValid(birthdate)).toBe(true);
    });

    it('throws error for age under 18', () => {
        const birthdate = '2030-06-15'
        expect(() => dateIsValid(birthdate)).toThrow('age must be over 18');
    });
});

/**
 * @function emailIsValid
 */
describe('emailIsValid', () => {
    it('returns true for valid email', () => {
        expect(emailIsValid('example@test.com')).toBe(true);
    });

    it('throws error for invalid email', () => {
        expect(() => emailIsValid('invalid-email')).toThrow('email is not valid');
    });
});

/**
 * @function postalCodeisValid
 */
describe('postalCodeisValid', () => {
    it('returns true for valid postal code', () => {
        expect(postalCodeisValid('75001')).toBeUndefined(); // No error
    });

    it('throws error for invalid postal code', () => {
        expect(() => postalCodeisValid('123')).toThrow('postal code is not valid');
    });
});

/**
 * @function canSubmit
 */
describe('canSubmit', () => {
    it('returns true when all values are present', () => {
        const form = { field1: 'value1', field2: 'value2' };
        expect(canSubmit(form)).toBe(true);
    });

    it('returns false when any value is empty', () => {
        const form = { field1: 'value1', field2: '' };
        expect(canSubmit(form)).toBe(false);
    });
});

/**
 * @function formErrors
 */
describe('formErrors', () => {
    mockDate()
    it('returns empty object when form is valid', () => {
        const form = {
            nom: 'John',
            prenom: 'Doe',
            ville: 'Paris',
            email: 'example@test.com',
            date: '2010-02-19',
            code: '75001',
        };
        expect(formErrors(form)).toEqual({});
    });

    it('returns errors for invalid fields', () => {
        const form = {
            nom: '',
            prenom: 'Doe!',
            ville: '2',
            email: 'invalid-email',
            date: '2030-02-19',
            code: '123',
        };
        expect(formErrors(form)).toEqual({
            nom: 'value is empty',
            prenom: '!is not a permitted character',
            ville: '2is not a permitted character',
            email: 'email is not valid',
            date: 'age must be over 18',
            code: 'postal code is not valid',
        });
    });
});

function mockDate() {
        let dateNowSpy;

beforeAll(() => {
    // Lock Time
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 2099601663000); //date = 14 juillet 2036
});

afterAll(() => {
    // Unlock Time
    dateNowSpy.mockRestore();
});
}
