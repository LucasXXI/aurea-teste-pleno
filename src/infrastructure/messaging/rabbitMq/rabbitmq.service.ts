import { Injectable } from "@nestjs/common";
import { connect } from "amqplib";


@Injectable()
export class RabbitMqService {
    private readonly aitReportQueue = 'processed-ait-queue';

    async publish(message: any) : Promise<void | Error>{
        try {
            const conn = await connect('amqp://localhost');
            const channel = await conn.createChannel();

            await channel.assertQueue(this.aitReportQueue, { durable: true });

            channel.sendToQueue(this.aitReportQueue, Buffer.from(JSON.stringify(message)), {
                persistent: true
            });

            console.log(` Mensagem enviada para ${this.aitReportQueue}:`, message);

            await channel.close();
            await conn.close();
        } catch (error) {
            console.error('Erro ao publicar mensagem no RabbitMQ:', error);
            throw new Error(`Erro ao publicar no RabbitMQ: ${error.message}`);
        }
    }
}