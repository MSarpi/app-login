import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    tituloModal: {
        fontWeight: "bold",
        fontSize: 17,
        marginBottom: 20
    },
    btn: {
        borderRadius: 10,
        marginBottom: 15
    },
    closeButton: {
        alignSelf: 'flex-end',
    },

    closeButtonText: {
        textAlign: 'right',
        color: 'black', // Puedes ajustar el color según tus necesidades
        fontWeight: "bold",
        fontSize: 20,   // Puedes ajustar el tamaño de fuente según tus necesidades
        marginRight: 10, // Puedes ajustar el margen derecho según tus necesidades
      }
})