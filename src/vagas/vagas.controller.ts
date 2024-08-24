import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VagasService } from './vagas.service';
import { Vaga } from './vaga.entity';

@Controller('vagas')
export class VagasController {
  constructor(private readonly vagasService: VagasService) {}

  @Get()
  findAll(): Promise<Vaga[]> {
    return this.vagasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Vaga> {
    return this.vagasService.findOne(id);
  }

  @Post()
  create(@Body() vaga: Vaga): Promise<Vaga> {
    return this.vagasService.create(vaga);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.vagasService.remove(id);
  }
}
