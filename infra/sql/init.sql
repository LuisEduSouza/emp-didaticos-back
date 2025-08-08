-- Tabela de usuários (alunos ou professores)
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('aluno', 'professor')),
    contato VARCHAR(100)
);

-- Tabela de equipamentos
CREATE TABLE equipamento (
    id_equipamento SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'disponivel' CHECK (status IN ('disponivel', 'emprestado', 'manutencao'))
);

-- Tabela de empréstimos
CREATE TABLE emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    id_equipamento INTEGER NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_prevista_devolucao DATE NOT NULL,
    data_real_devolucao DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'concluido', 'atrasado')),
    
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_equipamento) REFERENCES equipamento(id_equipamento) ON DELETE CASCADE
);

CREATE OR REPLACE VIEW emprestimos_detalhados AS
SELECT
    e.id_emprestimo,
    u.id_usuario,
    u.nome AS nome_usuario,
    u.tipo_usuario,
    eq.id_equipamento,
    eq.nome AS nome_equipamento,
    eq.categoria,
    e.data_emprestimo,
    e.data_prevista_devolucao,
    e.data_real_devolucao,
    e.status,
    -- Coluna que verifica atraso em tempo real
    CASE
        WHEN e.data_real_devolucao IS NULL AND e.data_prevista_devolucao < CURRENT_DATE THEN true
        ELSE false
    END AS esta_em_atraso
FROM emprestimo e
JOIN usuario u ON e.id_usuario = u.id_usuario
JOIN equipamento eq ON e.id_equipamento = eq.id_equipamento;

INSERT INTO Usuario (nome, tipo_usuario, contato) VALUES
('Anakin Skywalker', 'aluno', 'anakin.skywwalker@gmail.com'),
('Obi-Wan Kenobi', 'professor', 'obi.kenobi@gmail.com'),
('Luke Skywalker', 'aluno', 'luke@gmail.com'),
('Imperador Palpatine', 'professor', 'palpatine@gmail.com'),
('Darth Vader', 'aluno', 'vader@gmail.com');

INSERT INTO Equipamento (nome, categoria, status) VALUES
('Notebook Dell', 'Informática', 'disponivel'),
('Multímetro Digital', 'Eletrônica', 'disponivel'),
('Kit Arduino Uno', 'Robótica', 'disponivel'),
('Projetor Epson', 'Audiovisual', 'disponivel'),
('Furadeira Bosch', 'Manutenção', 'disponivel');



-- 1. Empréstimo ativo e em atraso (não devolvido, prazo já passou)
INSERT INTO Emprestimo (
    id_usuario, id_equipamento, data_emprestimo, data_prevista_devolucao, status
) VALUES (
    1, 5, '2025-07-15', '2025-07-20', 'ativo'
);

-- 2. Empréstimo ativo, ainda dentro do prazo
INSERT INTO Emprestimo (
    id_usuario, id_equipamento, data_emprestimo, data_prevista_devolucao, status
) VALUES (
    2, 4, '2025-07-26', '2025-07-30', 'ativo'
);

-- 3. Empréstimo concluído dentro do prazo
INSERT INTO Emprestimo (
    id_usuario, id_equipamento, data_emprestimo, data_prevista_devolucao, data_real_devolucao, status
) VALUES (
    3, 2, '2025-07-10', '2025-07-15', '2025-07-14', 'concluido'
);

-- 4. Empréstimo concluído com atraso
INSERT INTO Emprestimo (
    id_usuario, id_equipamento, data_emprestimo, data_prevista_devolucao, data_real_devolucao, status
) VALUES (
    4, 3, '2025-07-05', '2025-07-10', '2025-07-13', 'concluido'
);

-- 5. Empréstimo ainda ativo e em atraso
INSERT INTO Emprestimo (
    id_usuario, id_equipamento, data_emprestimo, data_prevista_devolucao, status
) VALUES (
    5, 1, '2025-07-18', '2025-07-22', 'ativo'
);
