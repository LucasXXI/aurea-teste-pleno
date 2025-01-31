import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotFoundException, HttpCode } from '@nestjs/common';
import { CreateAitDto } from '../../application/dtos/requests/ait.create.dto';
import { UpdateAitDto } from '../../application/dtos/requests/ait.update.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IProcessAitUseCase } from 'src/domain/interfaces/useCases/ait.processor.useCase.interface';
import { IDeleteAitUseCase } from 'src/domain/interfaces/useCases/aitDelete.useCase.interface';
import { IListAitsUseCase } from 'src/domain/interfaces/useCases/aitList.useCase.interface';
import { IRegisterAitUseCase } from 'src/domain/interfaces/useCases/aitRegister.useCase.interface';
import { IUpdateAitUseCase } from 'src/domain/interfaces/useCases/aitUpdate.useCase.interface';
import { EntityNotFoundError } from 'src/domain/exceptions/ait.notFound.error';

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
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createAitDto: CreateAitDto) {
    const registeredAit = this.registerAitUseCase.register(createAitDto);

    if(registeredAit instanceof Error) throw registeredAit;

    return registeredAit;
  }

  @Get()
  @ApiOperation({ summary: 'Listagem de AITs' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll() {
    const listedAits = await this.listAitsUseCase.listAll();

    if(listedAits instanceof EntityNotFoundError) throw new NotFoundException(listedAits.message);

    if(listedAits instanceof Error) throw new Error(`Erro inesperado ao buscar AITs: ${listedAits.message}`);

    return listedAits;

  }

  @Get(':id')
  @ApiOperation({ summary: 'Listagem de AIT especifica' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('id') id: string) {
    const ait = await this.listAitsUseCase.listByFineId(id);
    
    if(ait instanceof EntityNotFoundError) throw new NotFoundException('Ait não encontrado!');
    
    if(ait instanceof Error) throw new Error(`Erro inesperado ao buscar AIT: ${ait.message}`);    ;

    return ait;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de AIT' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  async update(@Param('id') id: string, @Body() updateAitDto: UpdateAitDto) {
    const updatedAit = await this.updateAitUseCase.update(id, updateAitDto);

    if(updatedAit instanceof EntityNotFoundError) throw new NotFoundException(updatedAit.message);

    if(updatedAit instanceof Error) throw updatedAit;

    return updatedAit;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remoção de AIT' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('id') id: string) {
    
    const deletedAit = await this.deleteAitUseCase.delete(id);
 
    if(deletedAit == false){
        throw new NotFoundException('Ait não encontrado');
    }

    if(deletedAit instanceof Error) throw deletedAit;
    
    HttpCode(200);
  }

  @Get('process')
  @ApiOperation({ summary: 'Processa AITs Pendentes' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async process(): Promise<any> {
      return await this.processAitUseCase.processAllFines();
  }
}
