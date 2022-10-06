const { pool } = require('../config');

const getMedicos = (request, response) => {
    pool.query(`select m.codigo as codigo, m.nome as nome, 
        m.crm as crm, m.cpf as cpf, 
        m.especialidade as especialidade, e.nome as nomeespecialidade
        from medico m
        join especialidade e on m.especialidade = e.codigo
        order by m.codigo`, 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao consultar os médicos: ' + error
            });
        }
        response.status(200).json(results.rows);
    })
}

const addMedico = (request, response) => {
    const {nome, crm, cpf, especialidade} = request.body;
    pool.query(`insert into medico (nome, crm, cpf, especialidade) 
    values ($1, $2, $3, $4)
    returning codigo, nome, crm, cpf, especialidade`, 
    [nome, crm, cpf, especialidade] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir o Médico!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Médico criado!",
            objeto : results.rows[0]
        });
    })
}

const updateMedico = (request, response) => {
    const {codigo, nome, crm, cpf, especialidade} = request.body;
    pool.query(`UPDATE medico
	SET nome=$1, crm=$2, cpf=$3, especialidade=$4
	WHERE codigo=$5
returning codigo, nome, crm, cpf, especialidade`, 
    [nome, crm, cpf, especialidade, codigo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao atualizar o Médico!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Médico criado!",
            objeto : results.rows[0]
        });
    })
}


const deleteMedico = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM medico WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover o Médico! ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Médico removido!"
        });
    })
}

const getMedicoPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM medico WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar o Médico!'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = {
    getMedicos, addMedico, updateMedico, deleteMedico, getMedicoPorCodigo
}
