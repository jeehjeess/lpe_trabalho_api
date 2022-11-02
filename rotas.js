const { Router } = require('express');

const controleEspecialidades = require('./controladores/especialidades');
const controleMedicos        = require("./controladores/medicos");
const seguranca              = require('./controladores/seguranca');

const rotas = new Router();

rotas.route("/login")
     .post(seguranca.login)

rotas.route('/medicos')
   .get(seguranca.verificaJWT, controleMedicos.getMedicos)
   .post(seguranca.verificaJWT, controleMedicos.addMedico)
   .put(seguranca.verificaJWT, controleMedicos.updateMedico)

rotas.route('/medicos/:codigo')
   .get(seguranca.verificaJWT, controleMedicos.getMedicoPorCodigo)
   .delete(seguranca.verificaJWT,controleMedicos.deleteMedico)


rotas.route('/especialidades')
     .get(seguranca.verificaJWT, controleEspecialidades.getEspecialidades)
     .post(seguranca.verificaJWT, controleEspecialidades.addEspecialidade)
     .put(seguranca.verificaJWT, controleEspecialidades.updateEspecialidade)

rotas.route('/especialidades/:codigo')
     .get(seguranca.verificaJWT, controleEspecialidades.getEspecialidadePorCodigo)
     .delete(seguranca.verificaJWT, controleEspecialidades.deleteEspecialidade)

module.exports = rotas;