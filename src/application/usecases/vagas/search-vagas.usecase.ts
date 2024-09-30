import { Inject, Injectable } from "@nestjs/common";
import { IVagasRepository, VagasRepository } from "../../../application/repositories/vagas.repository";
import { Vaga } from "../../../domain/models/vaga.model";

@Injectable()
export class SearchVagasUseCase {
  constructor(@Inject(IVagasRepository) private readonly vagasRepository: VagasRepository) { }

  async execute(query: string, tipoDeficiencia?: string): Promise<Array<Vaga>> {
    return await this.vagasRepository.search(query, tipoDeficiencia);
  }
}
