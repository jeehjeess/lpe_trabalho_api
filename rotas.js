const { Router } = require('express');

const controleEspecialidades = require('./controladores/especialidades');
const controleMedicos = require("./controladores/medicos");

const rotas = new Router();

rotas.route('/medicos')
   .get(controleMedicos.getMedicos)
   .post(controleMedicos.addMedico)
   .put(controleMedicos.updateMedico)

rotas.route('/medicos/:codigo')
   .get(controleMedicos.getMedicoPorCodigo)
   .delete(controleMedicos.deleteMedico)


rotas.route('/especialidades')
     .get(controleEspecialidades.getEspecialidades)
     .post(controleEspecialidades.addEspecialidade)
     .put(controleEspecialidades.updateEspecialidade)

rotas.route('/especialidades/:codigo')
     .get(controleEspecialidades.getEspecialidadePorCodigo)
     .delete(controleEspecialidades.deleteEspecialidade)

module.exports = rotas;