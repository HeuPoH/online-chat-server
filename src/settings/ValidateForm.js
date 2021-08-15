class ValidateForm {
    static #getValidatePatterns(form, formName) {
        const forms = {
            signIn: {
                nickname: value => /[a-zA-Zа-яА-Я0-9]{2,10}/.test(value),
                password: value => /[a-zA-Zа-яА-Я0-9]{5,20}/.test(value),
            },
            signUp: {
                nickname: value => /[a-zA-Zа-яА-Я0-9]{2,10}/.test(value),
                password: value => /[a-zA-Zа-яА-Я0-9]{5,20}/.test(value),
                repeatPassword: value => value === form.password
            }
        };

        return forms[formName];
    }

    static findErrors(form, formName) {
        const validateForm = this.#getValidatePatterns(form, formName);

        return Object.keys(validateForm).find(field => {
            // If the field in form is undefined, return the flag true (error found)
            if(!form[field]) return true;

            return validateForm[field](form[field]) === false;
        });
    }
}

module.exports = ValidateForm;