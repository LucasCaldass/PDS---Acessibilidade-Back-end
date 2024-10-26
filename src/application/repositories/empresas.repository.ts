import { Empresa, EmpresaResponse } from "../../domain/models/empresa.model";

export const IEmpresasRepository = 'EmpresasRepository'

export interface EmpresasRepository {
  create(empresa: Empresa): Promise<Empresa>;
  findAll(): Promise<Array<Empresa>>;
  findById(id: string): Promise<Empresa>;
  findByEmail(email: string): Promise<EmpresaResponse>;
  deleteById(id: string): Promise<void>;
}
