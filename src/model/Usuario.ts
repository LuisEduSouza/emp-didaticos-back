import { error } from "console";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

export class Usuario {
    private idUsuario: number = 0;
    private nome: string;
    private tipoUsuario: string;
    private contato: string;

    public constructor(_nome: string, _tipoUsuario: string, _contato: string) {
        this.nome = _nome;
        this.tipoUsuario = _tipoUsuario;
        this.contato = _contato;
    }

    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public setIdUsuario(id: number): void {
        this.idUsuario = id;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getTipoUsuario(): string {
        return this.tipoUsuario;
    }

    public setTipoUsuario(tipoUsuario: string): void {
        this.tipoUsuario = tipoUsuario;
    }

    public getContato(): string {
        return this.contato;
    }

    public setContato(contato: string): void {
        this.contato = contato;
    }

    static async listarUsuario(): Promise<Array<Usuario> | null> {
        let listaUsuario: Array<Usuario> = [];
        try {
            const querySelectUsuario = `SELECT * FROM USUARIO`
            const respotaDB = await database.query(querySelectUsuario);

            if (respotaDB == null) {
                console.error("Erro ao retornar lista de usuários");
            }

            respotaDB.rows.forEach((usuario) => {
                let novoUsuario = new Usuario(
                    usuario.nome,
                    usuario.tipo_usuario,
                    usuario.contato
                )
                novoUsuario.setIdUsuario(usuario.id_usuario);
                listaUsuario.push(novoUsuario);
            });

            return listaUsuario;
        } catch (error) {
            console.error("Erro ao retornar lista de usuários" + error);
            return null;
        }
    }

    static async cadastroUsuario(usuario: Usuario): Promise<boolean> {
        try {
            const queryInsertUsuario = `INSERT INTO Usuario(nome, tipo_usuario, contato) VALUES 
                                        ('${usuario.getNome()}',
                                        '${usuario.getTipoUsuario()}',
                                        '${usuario.getContato()}')
                                        RETURNING id_usuario`;
            const respotaDB = await database.query(queryInsertUsuario);
            if(respotaDB.rowCount != 0){
                const idUsuario = respotaDB.rows[0].id_usuario
                console.log(`Usuário cadastrado com sucesso! Id do usuário criado ${idUsuario}`)
                return true;
            }

            return false;
        } catch (error) {
            console.error('Erro ao cadastrar usuário' + error);
            return false;
        }
    }

    static async atualizarUsuario(usuario:Usuario): Promise<boolean>{
        try {
            const queryUpdateUsuario = `UPDATE usuario
                                        SET nome = '${usuario.getNome()}',
                                            tipo_usuario = '${usuario.getTipoUsuario()}',
                                            contato = '${usuario.getContato()}'
                                        WHERE id_usuario = ${usuario.getIdUsuario()}`
            const respostaDB = await database.query(queryUpdateUsuario);

            if(respostaDB.rowCount !== 0){
                console.log(`Usuário atualizado com sucesso!`);
                return true;
            } else{
                console.error(`Erro ao atualizar usuário!`)
                return false;
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário' + error);
            return false;
        }
    }
    static async removerUsuario(idUsuario: number): Promise<boolean> {
        try {
            const queryDeleteUsuario = `DELETE FROM usuario WHERE id_usuario = ${idUsuario};`;

            const respostaBD = await database.query(queryDeleteUsuario);

            if (respostaBD.rowCount != 0) {
                console.log(`Usuario removido com sucesso! ID do usuário: ${idUsuario}`);
                return true;
            }

            return false;

        } catch (error) {

            console.log('Erro ao remover o carro. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }
}