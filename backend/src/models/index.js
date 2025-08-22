// backend/src/models/index.js

const { sequelize } = require('../config/database');

// 1. Importar todos os models que criamos
const Usuario = require('./user.model');
const Instituicao = require('./instituicao.model');
const Turma = require('./turma.model');
const Disciplina = require('./disciplina.model');

// 2. Definir as associações entre os models

// Relação: Instituicao <-> Turma (Um-para-Muitos)
// Uma Instituição pode ter várias Turmas.
Instituicao.hasMany(Turma, {
  foreignKey: 'instituicao_id', // Nome da chave estrangeira na tabela TURMA
  as: 'turmas' // Apelido para a associação
});
// Uma Turma pertence a uma única Instituição.
Turma.belongsTo(Instituicao, {
  foreignKey: 'instituicao_id',
  as: 'instituicao'
});


// Relação: Turma <-> Usuario (Muitos-para-Muitos)
// Uma turma pode ter muitos alunos/professores, e um aluno/professor pode estar em muitas turmas.
// Para isso, o Sequelize criará tabelas de junção automaticamente.

// Alunos em Turmas
Turma.belongsToMany(Usuario, {
  through: 'TurmaAluno', // Nome da tabela de junção
  foreignKey: 'turma_id',
  as: 'alunos'
});
Usuario.belongsToMany(Turma, {
  through: 'TurmaAluno',
  foreignKey: 'usuario_id',
  as: 'turmas_aluno'
});

// Professores em Turmas
Turma.belongsToMany(Usuario, {
    through: 'TurmaProfessor',
    foreignKey: 'turma_id',
    as: 'professores'
});
Usuario.belongsToMany(Turma, {
    through: 'TurmaProfessor',
    foreignKey: 'usuario_id',
    as: 'turmas_professor'
});


// Relação: Turma <-> Disciplina (Muitos-para-Muitos)
// Uma turma pode ter várias disciplinas, e uma disciplina pode ser lecionada em várias turmas.
Turma.belongsToMany(Disciplina, {
    through: 'TurmaDisciplina',
    foreignKey: 'turma_id',
    as: 'disciplinas'
});
Disciplina.belongsToMany(Turma, {
    through: 'TurmaDisciplina',
    foreignKey: 'disciplina_id',
    as: 'turmas'
});


// 3. Sincronizar o banco de dados
// Esta função irá verificar todos os models definidos e, se as tabelas não existirem no banco, irá criá-las.
const syncDatabase = async () => {
  try {
    // O { alter: true } tenta alterar as tabelas existentes para corresponder ao model, sem apagar dados.
    // Em produção, usaríamos 'migrations' em vez disso.
    await sequelize.sync({ alter: true }); 
    console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};


// 4. Exportar tudo
module.exports = {
  sequelize,
  syncDatabase,
  Usuario,
  Instituicao,
  Turma,
  Disciplina
};