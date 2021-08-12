const validateForms = require("./validateForms")

describe('Test validate fields', () => {
    it('Test sign in', () => {
        let form = {  };
        expect(validateForms(form, 'signIn')).toBeTruthy();

        form = { mail: '1234' };
        expect(validateForms(form, 'signIn')).toBeTruthy();

        form = {
            nickname: '',
        };
        expect(validateForms(form, 'signIn')).toBeTruthy();

        form = {
            password: '',
        };
        expect(validateForms(form, 'signIn')).toBeTruthy();

        form = {
            nickname: '1232',
            password: '',
        };
        expect(validateForms(form, 'signIn')).toBeTruthy();

        form = {
            nickname: 'werw',
            password: '12345678997',
        };
        expect(validateForms(form, 'signIn')).toBeFalsy();
    });

    it('Test sign up', () => {
        let form = {  };
        expect(validateForms(form, 'signUp')).toBeTruthy();

        form = { mail: '1234' };
        expect(validateForms(form, 'signUp')).toBeTruthy();

        form = {
            nickname: '',
        };
        expect(validateForms(form, 'signUp')).toBeTruthy();

        form = {
            password: '',
        };
        expect(validateForms(form, 'signUp')).toBeTruthy();

        form = {
            nickname: '1232',
            password: '',
        };
        expect(validateForms(form, 'signUp')).toBeTruthy();

        form = {
            nickname: 'werw',
            password: '12345678997',
            repeatPassword: '1234567899'
        };
        expect(validateForms(form, 'signUp')).toBeTruthy();

        form = {
            nickname: 'werw',
            password: '12345678997',
            repeatPassword: '12345678997'
        };
        expect(validateForms(form, 'signUp')).toBeFalsy();
    });
})