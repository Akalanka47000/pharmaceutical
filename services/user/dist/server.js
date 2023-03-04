var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_crypto = __toESM(require("crypto"));
var import_express = __toESM(require("express"));
var import_compression = __toESM(require("compression"));
var import_helmet = __toESM(require("helmet"));
var import_express_http_context = __toESM(require("express-http-context"));
var import_clusterizer = __toESM(require("@sliit-foss/clusterizer"));
var import_utils = require("./utils");
var import_module_logger = require("@sliit-foss/module-logger");
var import_middleware = require("./middleware");
var import_config = __toESM(require("./config"));
var import_routes = __toESM(require("./routes"));
const logger = (0, import_module_logger.moduleLogger)("Server");
(0, import_clusterizer.default)(
  () => {
    const app = (0, import_express.default)();
    app.use((0, import_helmet.default)());
    app.use((0, import_compression.default)());
    app.use(import_express.default.json({ limit: "1mb" }));
    app.use(import_express.default.urlencoded({ extended: true }));
    app.use(import_express_http_context.default.middleware);
    app.use((req, _res, next) => {
      import_express_http_context.default.set("correlationId", req.headers[import_utils.correlationId] ?? import_crypto.default.randomBytes(16).toString("hex"));
      next();
    });
    app.use(`/api`, import_routes.default);
    app.use(import_middleware.responseInterceptor);
    app.use(import_middleware.errorHandler);
    app.listen(import_config.default.PORT, import_config.default.HOST, () => {
      logger.info(`User service listening on ${import_config.default.HOST}:${import_config.default.PORT}`);
    });
  },
  { logger }
);
//# sourceMappingURL=server.js.map
