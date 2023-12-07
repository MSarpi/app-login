import * as Yup from "yup"

export function initialValues() {
    return {
        email: "",
        password: "",
    }
    
}
export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .email("El email no es correcto")
            .required("Email Obligatorio"),
        password: Yup.string()
            .required("Debe ingresar una contraseña")
    })
}