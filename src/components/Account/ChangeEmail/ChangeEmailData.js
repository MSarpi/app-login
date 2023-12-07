import * as Yup from "yup"

export  function initialValues() {
  return {
    displayEmail: "",
    displayPassword: ""
  }
}

export  function validationSchema() {
    return Yup.object({
    displayEmail: Yup.string()
    .email("El correo no es valido")
    .required("Debe ingresar un Correo nuevo"),
    displayPassword: Yup.string().required("La contraseña es requerida")
    })
  }