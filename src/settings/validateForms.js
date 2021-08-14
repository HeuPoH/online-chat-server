/**
 * Check fields of form. 
 * 
 * @param {Object} form fields of form
 * @param {string} name 
 * @returns {boolean}
 */
function validateForms(form, name) {
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
    }

    const validateForm = forms[name];

    return Object.keys(validateForm).find(field => {
        /**
         * If the field in form is undefined, return the flag true (has error)
         */
        if(!form[field]) return true;

        return validateForm[field](form[field]) === false;
    });
}

module.exports = validateForms;