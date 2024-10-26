import { Usuario, UsuarioResponse } from "../../domain/models/usuario.model";

export const IUsuariosRepository = 'UsuariosRepository'

export interface UsuariosRepository {
  create(usuario: Usuario): Promise<Usuario>;
  findAll(): Promise<Array<Usuario>>;
  findById(id: string): Promise<Usuario>;
  findByEmail(email: string): Promise<UsuarioResponse>;
  deleteById(id: string): Promise<void>;
}
