import { Injectable } from "@nestjs/common";
import { connect } from "amqplib";


@Injectable()
export class RabbitMqService {
    private readonly aitReportQueue = 'processed-ait-queue';

    async publish(message: string) : Promise<boolean | Error>{
        try {
            const conn = await connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
            const channel = await conn.createConfirmChannel();

            await channel.assertQueue(this.aitReportQueue, { durable: true });

            return new Promise((resolve, reject) => {
                channel.sendToQueue(this.aitReportQueue, Buffer.from(message), 
                {
                    persistent: true,
                    contentType: 'text/csv',
                }, async (err) => {
                    if (err) {
                        console.error(`Falha ao publicar mensagem na fila "${this.aitReportQueue}":`, err);
                        await channel.close();
                        await conn.close();
                        reject(false);
                    } else {
                        console.log(`Mensagem confirmada na fila "${this.aitReportQueue}":`, message);
                        await channel.close();
                        await conn.close();
                        resolve(true);
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao publicar mensagem no RabbitMQ:', error);
            throw new Error(`Erro ao publicar no RabbitMQ: ${error.message}`);
        }
    }
}