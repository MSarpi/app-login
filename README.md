# Configuración de Firebase para tu Proyecto
Este archivo README te guiará a través de los pasos necesarios para configurar Firebase en tu proyecto. Sigue estos pasos para asegurar una integración adecuada.

## Paso 1: Crear un Nuevo Proyecto en Firebase
Accede a Firebase Console.
Crea un nuevo proyecto y asigna un nombre de tu elección.
Opcional: Activa Google Analytics si así lo prefieres.
Haz clic en "Crear proyecto".

## Paso 2: Configurar la Autenticación
Ve a la sección "Compilación" en tu proyecto de Firebase.
Selecciona "Authentication" y haz clic en "Comenzar".
Elige "Correo electrónico/Contraseña" y habilita únicamente "Correo electrónico/Contraseña".
Guarda la configuración.

## Paso 3: Configurar el Almacenamiento
Navega a la sección "Compilación" nuevamente y selecciona "Storage".
Haz clic en "Comenzar" y elige iniciar en modo de producción.
Selecciona tu región o elige "Multi-Regional" para hacerlo universal.
Haz clic en "Listo" y espera a que los componentes se carguen.

## Paso 4: Configurar Reglas de Almacenamiento
En la sección "Storage", ve a "Rules".
Cambia la regla de seguridad de allow read, write: if false; a allow read, write: if true;.
Guarda los cambios.
Tu proyecto de Firebase está ahora configurado correctamente. Estos pasos te permitirán almacenar usuarios registrados y gestionar el almacenamiento de archivos, como imágenes, en tu aplicación. Recuerda ajustar cualquier otra configuración según las necesidades específicas de tu proyecto. ¡Buena suerte!

# Configuración de Firebase con React Native
Una vez que hayas configurado Firebase, sigue estos pasos para vincularlo a tu proyecto React Native.

## Paso 1: Configurar Firebase en tu Proyecto
En el proyecto Firebase, ve a la sección "Descripción general".
Haz clic en el engranaje al lado y selecciona "Configuración del proyecto".
En la parte inferior, busca la sección "Tus Apps" y crea una nueva.
Selecciona la opción </>.
Ingresa un nombre para tu aplicación y, si tienes un hosting, marca la casilla correspondiente.
Haz clic en "Registrar app". Este proceso puede llevar unos segundos o minutos dependiendo de tu conexión.

## Paso 2: Obtener la Configuración de Firebase
Una vez registrada la app, Firebase te proporcionará los datos necesarios.
Verás un bloque de código, lo copias pero sin el // Initialize Firebase
const app = initializeApp(firebaseConfig);

## Paso 3: Vincular Firebase a tu Proyecto React Native
Una vez copiado lo unico que tienes que hacer es ir a sr/utils/firebase.js y copias el estracto de la pagina de fire base pero sin borrar 
// Initialize Firebase
export const initfirebase = initializeApp(firebaseConfig);

# Configuracion para React native
Una vez completado todos los pasos, lo unico que estaria faltando es:
## npm install
## npm start
y selecciona tu emulador de android o iOS que estes usando y a disfrutar