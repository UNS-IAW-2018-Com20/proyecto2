# Proyecto2 - Ingeniería de Aplicaciones Web
## Servidor Node.js + Express + Mongo DB
### Reentrega y modificaciones para el proyecto3
Se corrigieron varios errores:
* Se modificó el modelo inicial de la base de datos, ya que el propuesto para el Proyecto 0 era muy relacional, y para su implementación se tuvieron que utilizar las funciones populate de mongoose en combinación con Promesas. Ésto volvía al sistema muy lento e ineficiente. Si bien ahora se mantienen algunos datos replicados, el acceso es mucho más rápido debido a manejar los datos compactos en pocas tablas.
* El callback del auth del acceso a twitter redirige a heroku luego de la autenticación. Si bien el funcionamiento es el correcto, a la hora de crear un nuevo usuario, no se le asigna al mismo un nuevo alumno, por lo que el único usuario de twitter asignado a un alumno es el de uno de los integrantes y se mostrará en vivo.
* Los passwords se almacenan encriptados.
* Sólo dos decimales en las notas.

### Usuarios y contraseñas para el Acceso
##### Evaluador
* Usuario: walterwhite@gmail.com
* Contraseña: *bluemeta*
* Usuario: mgallardo
* Contraseña: *sarachi*
##### Alumno
* Usuario: jorgesilviocardozo@gmail.com
* Contraseña: *aprobado*
* Usuario: terceroguillermo@gmail.com  
* Contraseña: *tercero*
* Usuario: lionelmessi@gmail.com
* Contraseña: *pulga*
