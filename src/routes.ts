import  express  from "express";
import { SERVER_ROUTES } from "./appConfig.js";
import { UsuarioController } from "./controller/UsuarioController.js";

const router = express.Router();

router.get('/',(req, res) =>{
    res.json({messagem: "Rota padrão"})
});

router.get(SERVER_ROUTES.LISTAR_USUARIO, UsuarioController.todos);
router.post(SERVER_ROUTES.NOVO_USUARIO, UsuarioController.novo);
router.put(SERVER_ROUTES.ATUALIZAR_USUARIO, UsuarioController.atualizar);
router.delete(SERVER_ROUTES.REMOVER_USUARIO, UsuarioController.remover)


export {router}