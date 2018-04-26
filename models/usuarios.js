const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tipo:{
    type: Number,
    required: true
    //Por ejemplo 1 es Evaluador, 2 es Alumno
  }
  tema: {
    type: Number
  }
});
module.exports = mongoose.model('Usuarios',userSchema);
