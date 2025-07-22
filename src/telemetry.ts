import { SeverityNumber, logs } from "@opentelemetry/api-logs";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";

import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";

const OTEL_COLLECTOR_HOST =
	process.env.OTEL_COLLECTOR_HOST || "http://otel-collector:4317";

export async function initTelemetry() {
	const traceExporter = new OTLPTraceExporter({ url: OTEL_COLLECTOR_HOST });
	const metricExporter = new OTLPMetricExporter({ url: OTEL_COLLECTOR_HOST });

	const metricReader = new PeriodicExportingMetricReader({
		exporter: metricExporter,
		exportIntervalMillis: 5000,
	});

	const sdk = new NodeSDK({
		traceExporter,
		metricReader,
		instrumentations: [getNodeAutoInstrumentations()],
	});

	sdk.start();

	const logger = logs.getLogger("tracing", "1.0.0");
	logger.emit({
		severityNumber: SeverityNumber.INFO,
		severityText: "INFO",
		body: "OpenTelemetry SDK started with gRPC",
		attributes: { "log.type": "init" },
	});

	process.on("SIGTERM", async () => {
		await sdk.shutdown();
		console.log("OpenTelemetry SDK shut down gracefully");
		process.exit(0);
	});

	return { logger };
}
