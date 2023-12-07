import * as Yup from "yup"

export function initialValues() {
    return {
        oldPassword: "",
        newPassword: "",
        newRePassword: "",
    }
    
}
export function validationSchema() {
    return Yup.object({
        oldPassword: Yup.string()
            .required("Debe ingresar contraseña actual"),
            newPassword: Yup.string()
            .required("Debe ingresar nueva contraseña"), 
            newRePassword: Yup.string()
            .required("Debe repetir nueva contraseña")
            .oneOf([Yup.ref("newPassword")
        ], "Nueva contraseña y confirmar N. Contraseña deben coincidir"),
    })
}