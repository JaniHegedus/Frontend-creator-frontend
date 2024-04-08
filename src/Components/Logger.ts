import pino, {TransportTargetOptions} from 'pino';
const transport: TransportTargetOptions = {
    target: 'pino-pretty',
    options: {
        colorize: true,
        translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss",
        ignore: 'pid,hostname',
    },
}
const logger = pino({
    transport
});
export default logger