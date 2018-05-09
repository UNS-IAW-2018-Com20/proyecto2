const mongoose = require('mongoose');
//Usuario "admin" y contraseña "sudo"
const dbURI = "mongodb://admin:sudo@ds115350.mlab.com:15350/sistema-evaluaciones"
 //const dbURI = "mongodb://localhost:27017/sistema-evaluaciones";
mongoose.connect(dbURI);
