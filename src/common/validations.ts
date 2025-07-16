import {IValidationMessage} from "./interfaces/validation.interface";


function validateRegistration(name: string, email: string, password: string): IValidationMessage {

    if(!name || !email || !password){
        return {
            success: false,
            message: "Invalid name, email and password"
        }
    }
    if(!emailValidation(email)) {
        return {
            success: false,
            message: "Invalid email"
        }
    }
    return { success: true };
}
function emailValidation(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

}

const Validations = { validateRegistration, emailValidation }

export default Validations;