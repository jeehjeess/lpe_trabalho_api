const {pool} = require('../config');

const getEspecialidades = (request, response) => {
    pool.query('SELECT * FROM especialidade order by codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar a especialidade: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }       
    )
}


const addEspecialidade = (request, response) => {
    const {nome, descricao} = request.body;
    pool.query(`INSERT INTO especialidade (nome, descricao) 
    values ($1, $2) returning codigo, nome, descricao`,
    [nome, descricao],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao inserir a especialidade: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Especialidade criada",
            objeto: results.rows[0]
        })
    })
}

const updateEspecialidade = (request, response) => {
    const {codigo, nome, descricao} = request.body;
    pool.query(`UPDATE especialidade SET nome=$1, descricao=$2
    where codigo=$3 returning codigo, nome, descricao`,
    [nome, descricao, codigo],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao alterar a especialidade: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Especialidade alterada",
            objeto: results.rows[0]
        })
    })
}

const deleteEspecialidade = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM especialidade WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao remover a especialidade: ' + 
                (error ? error :'Não removeu nenhuma linha')
            })
        }
        response.status(200).json({
            status : "success" , message : "Especialidade removida"
        })
    })
}

const getEspecialidadePorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM especialide WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar a especialidade: ' + 
                (error ? error :'Não encontrou nenhuma linha')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getEspecialidades, addEspecialidade, updateEspecialidade, deleteEspecialidade, getEspecialidadePorCodigo
}

