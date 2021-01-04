import winston from 'winston';
const transports = [];
if (process.env.NODE_ENV !== 'development') {
    transports.push(new (winston.transports.Console)({
        // @ts-ignore
        prettyPrint: true,
        colorize: true,
        timestamp: true,
    }));
}
else {
    transports.push(
    // @ts-ignore
    new winston.transports.Console({
        format: winston.format.combine(winston.format.cli(), winston.format.splat())
    }));
}
// @ts-ignore
const logger = winston.createLogger({
    // @ts-ignore
    level: 0,
    levels: winston.config.npm.levels,
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple(), winston.format.printf(msg => winston.format.colorize().colorize(msg.level, `${msg.level.toUpperCase()}\x1b[0m ${msg.message}`))),
    transports
});
export default logger;
