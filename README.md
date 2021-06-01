# Bienvenido a To-Do App!

Esta es una simple apliación donde puedes escribir tus tareas con un título, una breve descripción y además agregarlas o eliminarlas de tus favoritos.

## Funcionalidades Principales

 - Swipe hacia la izquierda para facilitar el agregar/eliminar de favoritos una tarea.
 - Swipe hacia la derecha para facilitar la opción de eliminar una tarea.
 - Selección multiple que te permite: 
	 - Eliminar tareas en grupo.
	 - Agregar/eliminar de los favoritos tareas en grupo.
- Marcar como terminada una tarea.
- Responsive design.
- Rutas protegidas.
- Micro-interacciones y animaciones.

## Tecnologías y Librerías Principales
- **React** para el front-end.
- **Typescript** para un tipado estricto. 
- **ESLint** y **Prettier** para darle el formato correcto al código. 
- **TailwindCSS** y **PostCSS**, framework para la UI.
- **Framer Motion** para las animaciones y micro-interacciones.
- **Jest** y **Testing Library** para testear componentes y funciones.
- **Storybooks** para documentación de componentes (Sigue en desarrollo 😁)
- **Netlify** como servicio de hosting y dominio. 
- **Figma** para el diseño del sitio 

## Ejecutar el proyecto

Puedes visitar el entorno de producción visitando [Link](https://60b62a353433a9000989aec7--loving-mccarthy-8a9fd9.netlify.app/)

Además, se puede revisar el diseño de la app visitando Figa: [Link](https://www.figma.com/file/1MwmIL6B6VWmDDePOh71f7/to-do-app?node-id=0%3A1)

Pero si se quiere ejecuta el entorno de desarrollo, primero debes descargarlo utilizando git: 

    git clone https://github.com/nicolasleal570/to-do-app.git

Y con **yarn** debes instalar las librerías: 

    yarn install

Ahora, ya estás listo para ejecutar el entorno de desarrollo del proyecto en tu computadora: 

    yarn start

Esto deberá abrir el puerto **:3000** y mostrar la aplicación.

## Otros comandos
- **yarn test** para ejecutar la suite de tests
- **yarn test-all** para ejecutar prettier, eslint y además la suite de tests
- **yarn build** para compilar el proyecto 
- - **yarn storybook** para ver la documentación del proyecto

