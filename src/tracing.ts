import { SeverityNumber, logs } from "@opentelemetry/api-logs/";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import {
	ConsoleLogRecordExporter,
	LoggerProvider,
	SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs/";

import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
const traceExporter = new OTLPTraceExporter({
	url: "http://otel-collector:4317/v1/traces",
});
const metricExporter = new OTLPMetricExporter({
	url: "http://otel-collector:4317/v1/metrics", // Different endpoint for metrics
});

const loggerProvider = new LoggerProvider();
// Add a processor to export log record
loggerProvider.addLogRecordProcessor(
	new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()),
);
logs.setGlobalLoggerProvider(loggerProvider);

const metricReader = new PeriodicExportingMetricReader({
	exporter: metricExporter,
	exportIntervalMillis: 5000, // Export every 5 seconds
});

const sdk = new NodeSDK({
	traceExporter,
	metricReader, // Add the metricReader
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
const logger = logs.getLogger("example", "1.0.0");

logger.emit({
	severityNumber: SeverityNumber.INFO,
	severityText: "INFO",
	body: "Starting otel-sdk",
	attributes: { "log.type": "custom" },
});

export { logger };
