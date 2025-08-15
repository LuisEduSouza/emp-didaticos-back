const SERVER_ROUTES = {
   NOVO_USUARIO: '/novo/usuario',
   LISTAR_USUARIO: '/listar/usuarios',
   ATUALIZAR_USUARIO: '/atualiza/usuario/:idUsuario',
   REMOVER_USUARIO: '/remove/usuario/:idUsuario',
   UNICO_USUARIO: '/lista/usuarioUnico/:idUsuario',

   NOVO_EQUIPAMENTO: '/novo/equipamento',
   LISTAR_EQUIPAMENTO: '/listar/equipamentos',
   ATUALIZAR_EQUIPAMENTO: '/atualiza/equipamento/:idEquipamento',
   REMOVER_EQUIPAMENTO: '/remove/equipamento/:idEquipamento',

   NOVO_EMPRESTIMO: '/novo/emprestimo',
   LISTAR_EMPRESTIMO: '/listar/emprestimos',
   LISTAR_EMPRESTIMOS_DETALHADO: '/listar/emprestimoDetalhado',
   ATUALIZAR_EMPRESTIMO: '/atualiza/emprestimo/:idEmprestimo',
}

export{SERVER_ROUTES}
