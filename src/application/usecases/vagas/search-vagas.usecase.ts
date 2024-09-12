import { Inject, Injectable } from "@nestjs/common";
import { IVagasRepository, VagasRepository } from "src/application/repositories/vagas.repository";
import { Vaga } from "src/domain/models/vaga.model";

@Injectable()
export class SearchVagasUseCase {
  constructor(@Inject(IVagasRepository) private readonly vagasRepository: VagasRepository) { }

  async execute(query: string): Promise<Array<Vaga>> {
    return await this.vagasRepository.search(query);
  }
}
