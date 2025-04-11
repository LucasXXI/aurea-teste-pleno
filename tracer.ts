import * as opentelemetry from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { APPLICATION, VERSION } from 'src/shared/configs/envs';

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});
const sdk = new opentelemetry.NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: APPLICATION,
    [ATTR_SERVICE_VERSION]: VERSION,
  }),
  traceExporter,
  instrumentations: [new HttpInstrumentation(), new PrismaInstrumentation()],
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start();
process.on('beforeExit', async () => {
  await sdk.shutdown();
});
