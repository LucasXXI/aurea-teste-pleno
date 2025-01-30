import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotFoundException, HttpCode } from '@nestjs/common';
import { CreateAitDto } from '../../application/dtos/requests/create-ait.dto';
import { UpdateAitDto } from '../../application/dtos/requests/update-ait.dto';
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

    if(listedAits instanceof Error) throw listedAits;

    if(listedAits.length == 0) throw new NotFoundException('Nenhum Ait encontrado!');

    return listedAits;

  }

  @Get(':id')
  @ApiOperation({ summary: 'Listagem de AIT especifica' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('id') id: string) {
    const ait = await this.listAitsUseCase.listByFineId(id);

    if(ait instanceof Error) throw ait;

    if(ait == null) throw new NotFoundException('Ait não encontrado!');

    return ait;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de AIT' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  async update(@Param('id') id: string, @Body() updateAitDto: UpdateAitDto) {
    return this.updateAitUseCase.update(id, updateAitDto);
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
    
    return HttpCode(200);

  }

  @Get('process')
  @ApiOperation({ summary: 'Processa AITs Pendentes' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  async process(): Promise<any> {
      return await this.processAitUseCase.processAllFines();
  }
}
