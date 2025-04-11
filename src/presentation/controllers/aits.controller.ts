import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  NotFoundException,
  HttpCode,
  InternalServerErrorException,
  ForbiddenException,
  Put,
} from '@nestjs/common';
import { CreateAitDto } from '../../application/dtos/requests/ait.create.dto';
import { UpdateAitDto } from '../../application/dtos/requests/ait.update.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { IProcessAitUseCase } from 'src/domain/interfaces/useCases/ait.processor.useCase.interface';
import { IDeleteAitUseCase } from 'src/domain/interfaces/useCases/aitDelete.useCase.interface';
import { IListAitsUseCase } from 'src/domain/interfaces/useCases/aitList.useCase.interface';
import { IRegisterAitUseCase } from 'src/domain/interfaces/useCases/aitRegister.useCase.interface';
import { IUpdateAitUseCase } from 'src/domain/interfaces/useCases/aitUpdate.useCase.interface';
import { EntityNotFoundError } from 'src/domain/exceptions/ait.notFound.error';
import { CsvGeneratorError } from 'src/domain/exceptions/csvGenerator.failed';
import { PublishInQueueError } from 'src/domain/exceptions/rabbitmq.failed';
import { EntityAlreadyProcessed } from 'src/domain/exceptions/ait.alreadyProcessed.error';
import { IdParamDTO } from 'src/application/dtos/requests/ait.id.dto';
import { trace, SpanStatusCode } from '@opentelemetry/api';

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
    private readonly processAitUseCase: IProcessAitUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de AIT' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createAitDto: CreateAitDto) {
    const tracer = trace.getTracer('ait-controller');
    return await tracer.startActiveSpan('create_ait', async (span) => {
      try {
        span.setAttribute('request_dto', JSON.stringify(createAitDto));

        const registeredAit =
          await this.registerAitUseCase.register(createAitDto);

        if (registeredAit instanceof Error) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: registeredAit.message,
          });
          throw registeredAit;
        }

        span.setAttribute('response_data', JSON.stringify(registeredAit));
        return registeredAit;
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message,
        });
        throw error;
      } finally {
        span.end();
      }
    });
  }

  @Get()
  @ApiOperation({ summary: 'Listagem de AITs' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll() {
    const tracer = trace.getTracer('ait-controller');
    return await tracer.startActiveSpan('list_all_aits', async (span) => {
      try {
        const listedAits = await this.listAitsUseCase.listAll();

        if (listedAits instanceof EntityNotFoundError) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: listedAits.message,
          });
          throw new NotFoundException(listedAits.message);
        }

        if (listedAits instanceof Error) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: listedAits.message,
          });
          throw new Error(
            `Erro inesperado ao buscar AITs: ${listedAits.message}`,
          );
        }

        span.setAttribute('response_count', listedAits.length);
        return listedAits;
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message,
        });
        throw error;
      } finally {
        span.end();
      }
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id da AIT',
    required: true,
  })
  @ApiOperation({ summary: 'Listagem de AIT especifica' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param() paramId: IdParamDTO) {
    const tracer = trace.getTracer('ait-controller');
    return await tracer.startActiveSpan('find_ait_by_id', async (span) => {
      try {
        span.setAttribute('ait_id', paramId.id);

        const ait = await this.listAitsUseCase.listByFineId(paramId.id);

        if (ait instanceof EntityNotFoundError) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: 'Ait não encontrado!',
          });
          throw new NotFoundException('Ait não encontrado!');
        }

        if (ait instanceof Error) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: ait.message,
          });
          throw new Error(`Erro inesperado ao buscar AIT: ${ait.message}`);
        }

        span.setAttribute('response_data', JSON.stringify(ait));
        return ait;
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message,
        });
        throw error;
      } finally {
        span.end();
      }
    });
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id da AIT',
    required: true,
  })
  @ApiOperation({ summary: 'Atualização de AIT' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(
    @Param() paramId: IdParamDTO,
    @Body() updateAitDto: UpdateAitDto,
  ) {
    const tracer = trace.getTracer('ait-controller');
    return await tracer.startActiveSpan('update_ait', async (span) => {
      try {
        span.setAttribute('ait_id', paramId.id);
        span.setAttribute('request_dto', JSON.stringify(updateAitDto));

        const updatedAit = await this.updateAitUseCase.update(
          paramId.id,
          updateAitDto,
        );

        if (updatedAit instanceof EntityAlreadyProcessed) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: updatedAit.message,
          });
          throw new ForbiddenException(updatedAit.message);
        }

        if (updatedAit instanceof EntityNotFoundError) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: updatedAit.message,
          });
          throw new NotFoundException(updatedAit.message);
        }

        if (updatedAit instanceof Error) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: updatedAit.message,
          });
          throw updatedAit;
        }

        span.setAttribute('response_data', JSON.stringify(updatedAit));
        return updatedAit;
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message,
        });
        throw error;
      } finally {
        span.end();
      }
    });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id da AIT',
    required: true,
  })
  @ApiOperation({ summary: 'Remoção de AIT' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param() paramId: IdParamDTO) {
    const tracer = trace.getTracer('ait-controller');
    return await tracer.startActiveSpan('delete_ait', async (span) => {
      try {
        span.setAttribute('ait_id', paramId.id);

        const deletedAit = await this.deleteAitUseCase.delete(paramId.id);

        if (deletedAit === false) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: 'Ait não encontrado',
          });
          throw new NotFoundException('Ait não encontrado');
        }

        if (deletedAit instanceof Error) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: deletedAit.message,
          });
          throw deletedAit;
        }

        HttpCode(200);
        return { message: 'Ait removido com sucesso!' };
      } catch (error) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message,
        });
        throw error;
      } finally {
        span.end();
      }
    });
  }

  @Put('process/pendings')
  @ApiOperation({ summary: 'Processador de AITs Pendentes' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async process() {
    const tracer = trace.getTracer('ait-controller');
    return await tracer.startActiveSpan(
      'process_pending_aits',
      async (span) => {
        try {
          const processedAits = await this.processAitUseCase.processAllFines();

          if (processedAits instanceof EntityNotFoundError) {
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: processedAits.message,
            });
            throw new NotFoundException(processedAits.message);
          }

          if (
            processedAits instanceof CsvGeneratorError ||
            processedAits instanceof PublishInQueueError
          ) {
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: processedAits.message,
            });
            throw new InternalServerErrorException(processedAits.message);
          }

          span.setAttribute('processed_result', JSON.stringify(processedAits));
          return { message: processedAits };
        } catch (error) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error.message,
          });
          throw error;
        } finally {
          span.end();
        }
      },
    );
  }
}
