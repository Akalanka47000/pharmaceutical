var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var interceptors_exports = {};
__export(interceptors_exports, {
  responseInterceptor: () => responseInterceptor
});
module.exports = __toCommonJS(interceptors_exports);
var import_os = __toESM(require("os"));
var import_express_http_context = __toESM(require("express-http-context"));
var import_constants = require("../utils/constants");
const responseInterceptor = /* @__PURE__ */ __name((_req, res, next) => {
  if (res.headersSent)
    return;
  res.set(import_constants.hostName, import_os.default.hostname());
  res.set(import_constants.correlationId, import_express_http_context.default.get("correlationId"));
  next();
}, "responseInterceptor");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  responseInterceptor
});
//# sourceMappingURL=interceptors.js.map
