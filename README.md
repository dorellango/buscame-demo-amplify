# amplify destacame (bus.CO)

SPA para el consumo de la API test de destacame. Desarrollada en nuxtjs como framework junto a vuejs.

https://master.d1t5qpr8h0pili.amplifyapp.com/

## Deployment

El deployment de la aplicación fue realizado traves de Amplify (AWS), el cual
se conecta directamente a este repositorio (master) y escucha por cambios para proceder a la etapa de build con los comandos tipicos de NuxtJs como SPA (npm run build).

## Estado

"Bus.co", que es el nombre de fantasía de esta SPA, permite la administración de viejes del lado del operador. Existen pestañas para la visualización de Trayectos, Buses, Pasajeros, Asientos, Choferes y una de "Booking" para la asignación de pasajeros a sus respectivos buses y un número limitado de asientos (10).

Existen restricciónes para el ingreso de cada modelo, así también como la asignación de relaciones, por ej. la de un solo bus por trayecto, o un asiento por pasajero entre otras.

La autenticación a la aplicación es servida como un parametro global dentro de cada petición, aunque como mejora el ideal sería permitir el acceso y autorización de usuarios vía **Cognito de Amazon** almacenando un JWT en Local Storage. Esto es una mejora del lado de la API, pero su implementación sería relativamente sencilla haciendo uso de **Amplify Framework**.

> Amplify consta de 2 variantes, una como Framework, y otra como servicio dentro de AWS (que es lo utilizado para el deployment de esta aplicación). Como framework https://aws-amplify.github.io/docs/ se ofrecen distintos modulos para la conexión de servicios AWS, permitiendo también la creación de recursos vía CloudFormation

El uso de Amplify Framework nos abriría la posibilidad de permitir el registro de usuarios y extender la plataforma para el uso de posibles pasajeros.

Otra potencial mejora sería el uso de Lambda Edge y forzar la entrega de contenido estático para motores de busqueda. Articulo relacionado https://medium.com/@dilanthaprasanjith/solving-spa-meta-problems-with-the-power-of-lambda-edge-cdc8773e23cc

## Estilos

Para los estilos se ha utilizado Tailwind https://tailwindcss.com/ como framework utility-first, pero para motivos de esta demo también se han declarado algunas clases en SASS que extienden del framework bajo la directiva @apply. Ver layout default.vue


## Build

Carpeta de distribución: **/dist**

``` bash
# comando de ejecución
$ npm run build
```
