# Proyecto2 - Ingeniería de Aplicaciones Web
## Servidor Node.js + Express + Mongo DB
### Reentrega y modificaciones para el proyecto3
Se corrigieron varios errores:
* Se modificó el modelo inicial de la base de datos, ya que el propuesto para el Proyecto 0 era muy relacional, y para su implementación se tuvieron que utilizar las funciones populate de mongoose en combinación con Promesas. Ésto volvía al sistema muy lento e ineficiente. Si bien ahora se mantienen algunos datos replicados, el acceso es mucho más rápido debido a manejar los datos compactos en pocas tablas.
* El callback del auth del acceso a twitter redirige a heroku luego de la autenticación.
* Los passwords se almacenan encriptados.
* Sólo dos decimales en las notas.
/
###Usuarios y contraseñas para el Acceso
#####Evaluador
* Usuario: walterwhite@gmail.com
* Contraseña: *bluemeta*
#####Alumno
* Usuario: jorgesilviocardozo@gmail.com
* Contraseña: *aprobado*
