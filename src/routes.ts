import  express  from "express";
import { SERVER_ROUTES } from "./appConfig.js";
import { UsuarioController } from "./controller/UsuarioController.js";
import EquipamentoController from "./controller/EquipamentoController.js";

const router = express.Router();

router.get('/',(req, res) =>{
    res.json({messagem: "Rota padrão"})
});

router.get(SERVER_ROUTES.LISTAR_USUARIO, UsuarioController.todos);
router.post(SERVER_ROUTES.NOVO_USUARIO, UsuarioController.novo);
router.put(SERVER_ROUTES.ATUALIZAR_USUARIO, UsuarioController.atualizar);
router.delete(SERVER_ROUTES.REMOVER_USUARIO, UsuarioController.remover);
router.get(SERVER_ROUTES.UNICO_USUARIO, UsuarioController.unico);

router.get(SERVER_ROUTES.LISTAR_EQUIPAMENTO, EquipamentoController.todos);
router.post(SERVER_ROUTES.NOVO_EQUIPAMENTO, EquipamentoController.novo);
router.put(SERVER_ROUTES.ATUALIZAR_EQUIPAMENTO, EquipamentoController.atualizar);
router.delete(SERVER_ROUTES.REMOVER_EQUIPAMENTO, EquipamentoController.remover);


export {router};