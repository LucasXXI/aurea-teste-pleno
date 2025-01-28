import { Inject, Injectable } from '@nestjs/common';
import { CreateAitDto } from './dto/create-ait.dto';
import { UpdateAitDto } from './dto/update-ait.dto';
import { IRegisterAitUseCase } from 'src/domain/interfaces/useCases/aitRegister.useCase.interface';

@Injectable()
export class AitsService {
  constructor(
    @Inject('IRegisterAitUseCase')
    private readonly registerAitUseCase: IRegisterAitUseCase,
    // private readonly updateAitUseCase: IUpdateAitUseCase,
    // private readonly deleteAitUseCase: IDeleteAitUseCase,
    // private readonly listAitsUseCase: IListAitsUseCase,
    // private readonly processAitUseCase: IProcessAitUseCase
  ) {}
  create(createAitDto: CreateAitDto) {
    return this.registerAitUseCase.execute(createAitDto);
  }

  findAll() {
    return `This action returns all aits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ait`;
  }

  update(id: number, updateAitDto: UpdateAitDto) {
    return `This action updates a #${id} ait`;
  }

  remove(id: number) {
    return `This action removes a #${id} ait`;
  }

  async process(){
    return `This action processes all aits`;
  }
}
