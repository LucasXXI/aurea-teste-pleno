import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateAitDto } from './dto/create-ait.dto';
import { UpdateAitDto } from './dto/update-ait.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IProcessAitUseCase } from 'src/domain/interfaces/useCases/ait.processor.useCase.interface';
import { IDeleteAitUseCase } from 'src/domain/interfaces/useCases/aitDelete.useCase.interface';
import { IListAitsUseCase } from 'src/domain/interfaces/useCases/aitList.useCase.interface';
import { IRegisterAitUseCase } from 'src/domain/interfaces/useCases/aitRegister.useCase.interface';
import { IUpdateAitUseCase } from 'src/domain/interfaces/useCases/aitUpdate.useCase.interface';

@Controller('ait')
export class AitsController {
  constructor(
        @Inject('IRegisterAitUseCase')
        private readonly registerAitUseCase: IRegisterAitUseCase,
        @Inject('IUpdateAitUseCase')
        private readonly updateAitUseCase: IUpdateAitUseCase,
        @Inject('IDeleteAitUseCase')
        private readonly deleteAitUseCase: IDeleteAitUseCase,
        @Inject('IListAitUseCase')
        private readonly listAitsUseCase: IListAitsUseCase,
        @Inject('IProcessAitUseCase')
        private readonly processAitUseCase: IProcessAitUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de AIT' })
  @ApiResponse({ status: 201, description: 'Sucesso' })
  create(@Body() createAitDto: CreateAitDto) {
    return this.registerAitUseCase.register(createAitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listagem de AITs' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  findAll() {
    return this.listAitsUseCase.listAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listagem de AIT especifica' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  findOne(@Param('id') id: string) {
    return this.listAitsUseCase.listByFineId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de AIT' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  update(@Param('id') id: string, @Body() updateAitDto: UpdateAitDto) {
    return this.updateAitUseCase.update(id, updateAitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remoção de AIT' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  remove(@Param('id') id: string) {
    return this.deleteAitUseCase.delete(id);
  }

  @Get('process')
  @ApiOperation({ summary: 'Processa AITs Pendentes' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  async process(): Promise<any> {
      return await this.processAitUseCase.processAllFines();
  }
}
