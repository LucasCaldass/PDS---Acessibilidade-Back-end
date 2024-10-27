import { Inject, Injectable } from "@nestjs/common";
import { IVagasRepository, VagasRepository } from "../../../application/repositories/vagas.repository";
import { Vaga } from "../../../domain/models/vaga.model";
import { IUsuariosRepository, UsuariosRepository } from "../../../application/repositories/usuario.repository";

@Injectable()
export class SearchRecommendedVagasUseCase {
  constructor(
    @Inject(IVagasRepository) private readonly vagasRepository: VagasRepository,
    @Inject(IUsuariosRepository) readonly usuariosRepository: UsuariosRepository
  ) { }

  async execute(userId: string): Promise<Array<Vaga>> {
    const usuario = await this.usuariosRepository.findById(userId);
    if (!usuario) {
      throw new Error('Usuário não registrado');
    }
    return await this.vagasRepository.searchRecommended(usuario.cargo_desejado);
  }
}
