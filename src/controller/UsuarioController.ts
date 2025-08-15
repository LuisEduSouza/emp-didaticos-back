import type { Request, Response } from "express";
import { Usuario } from "../model/Usuario.js";

interface UsuarioDTO {
    nome: string;
    tipoUsuario: string;
    contato: string;
}

export class UsuarioController extends Usuario {
    static async todos(req: Request, res: Response) {
        try {
            const listaDeUsarios = await Usuario.listarUsuario();
            return res.status(200).json(listaDeUsarios)

        } catch (error) {
            return res.status(400).json('Não foi possível retornar a lista de usuários')
        }
    }

    static async novo(req: Request, res: Response) {
        try {
            const usuarioRecebido: UsuarioDTO = req.body;
            const novoUsuario = new Usuario(
                usuarioRecebido.nome,
                usuarioRecebido.tipoUsuario,
                usuarioRecebido.contato
            );

            const respostaModel = await Usuario.cadastroUsuario(novoUsuario);

            if (respostaModel) {
                return res.status(201).json({ messagem: "Usuario cadastrado com sucesso!" })
            } else {
                return res.status(400).json({ messagem: "Erro ao cadastrar usuário!" })
            }
        } catch (error) {
            return res.status(400).json('Não foi possível cadastrar um novo usuário')
        }
    }
    
    static async atualizar(req: Request, res: Response) {
        try {
            const idUsuario = parseInt(req.params.idUsuario as string);
    
            if (!idUsuario || Number.isNaN(idUsuario)) {
                return res.status(400).json({ mensagem: "ID inválido ou ausente." });
            }
    
            const usuarioRecebido: UsuarioDTO = req.body;
            const usuarioAtualizado = new Usuario(
                usuarioRecebido.nome,
                usuarioRecebido.tipoUsuario,
                usuarioRecebido.contato
            );
            usuarioAtualizado.setIdUsuario(idUsuario);
    
            const respostaModel = await Usuario.atualizarUsuario(usuarioAtualizado);
    
            if (respostaModel) {
                return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao atualizar o usuário." });
            }
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro no servidor ao atualizar o usuário." });
        }
    }
    
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idUsuario = parseInt(req.params.idUsuario as string);

            const repostaModel = await Usuario.removerUsuario(idUsuario);

            if (repostaModel) {
                return res.status(200).json({ mensagem: "O usuário foi removido com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao atualizar o usuário. Entre em contato com o administrador do sistema." });
            }

        } catch (error) {
            console.log(`Erro ao remover um usuário. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível remover o usuário. Entre em contato com o administrador do sistema." });
        }
    }

    static async unico(req: Request, res: Response): Promise<any> {
        try {
            const idUsuario = parseInt(req.params.idUsuario as string);
    
            if (!idUsuario || Number.isNaN(idUsuario)) {
                return res.status(400).json({
                    mensagem: "Parâmetro idUsuario inválido ou ausente."
                });
            }
    
            const usuario = await Usuario.buscarPorId(idUsuario);
    
            if (!usuario) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado."
                });
            }
    
            return res.status(200).json(usuario);
    
        } catch (error) {
            console.error(`Erro ao buscar usuário: ${error}`);
            return res.status(500).json({
                mensagem: "Erro ao buscar usuário."
            });
        }
    }
}