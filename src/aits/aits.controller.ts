import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AitsService } from './aits.service';
import { CreateAitDto } from './dto/create-ait.dto';
import { UpdateAitDto } from './dto/update-ait.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('aits')
export class AitsController {
  constructor(private readonly aitsService: AitsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de AIT' })
  @ApiResponse({ status: 201, description: 'Sucesso' })
  create(@Body() createAitDto: CreateAitDto) {
    return this.aitsService.create(createAitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listagem de AITs' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  findAll() {
    return this.aitsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listagem de AIT especifica' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  findOne(@Param('id') id: string) {
    return this.aitsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualização de AIT' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  update(@Param('id') id: string, @Body() updateAitDto: UpdateAitDto) {
    return this.aitsService.update(+id, updateAitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remoção de AIT' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  remove(@Param('id') id: string) {
    return this.aitsService.remove(+id);
  }

  @Get('process')
  @ApiOperation({ summary: 'Processa AITs Pendentes' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  async process(): Promise<any> {
      return await this.aitsService.process();
  }
}
