const ValidateForm = require("./ValidateForm")

describe('Test sign in', () => {
    let i = 0;
    const forms = [
        {  },
        { mail: '1234' },
        { nickname: '' },
        { password: '' },
        { nickname: '1232', password: '' },
        { nickname: 'werw', password: '123456789970poll' }
    ];
    
    afterEach(() => {
        i = i + 1;
    });

    test('', () => expect(ValidateForm.findErrors(forms[i], 'signIn')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signIn')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signIn')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signIn')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signIn')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signIn')).toBeFalsy());
});

describe('Test sign up', () => {
    let i = 0;
    const forms = [
        {  },
        { mail: '1234' },
        { nickname: '' },
        { password: '' },
        { nickname: '1232', password: '' },
        { nickname: 'werw', password: '12345678997', repeatPassword: '1234567899' },
        { nickname: 'werw', password: '12345678997', repeatPassword: '12345678997' }
    ];
    
    afterEach(() => {
        i = i + 1;
    });

    test('', () => expect(ValidateForm.findErrors(forms[i], 'signUp')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signUp')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signUp')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signUp')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signUp')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signUp')).toBeTruthy());
    test('', () => expect(ValidateForm.findErrors(forms[i], 'signUp')).toBeFalsy());
});