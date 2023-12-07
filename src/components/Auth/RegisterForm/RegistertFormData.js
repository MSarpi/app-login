import * as Yup from "yup"

export function initialValues() {
    return {
        user: "",
        email: "",
        password: "",
        repassword: "",
    }
    
}
export function validationSchema() {
    return Yup.object({
        user: Yup.string()
            .required("Se requiere un nombre de usuario"),
        email: Yup.string()
            .email("El email no es correcto")
            .required("Email Obligatorio"),
        password: Yup.string()
            .required("Debe ingresar una contraseña"),
        repassword: Yup.string()
            .required("Debe ingresar una contraseña").oneOf([Yup.ref("password")], "Las contraseñas no coinciden")


    })
}