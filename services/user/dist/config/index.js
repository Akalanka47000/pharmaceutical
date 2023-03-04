var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var config_exports = {};
__export(config_exports, {
  default: () => config_default
});
module.exports = __toCommonJS(config_exports);
var import_celebrate = require("celebrate");
class Base {
  static get schema() {
    return {
      HOST: import_celebrate.Joi.string().optional(),
      PORT: import_celebrate.Joi.number().optional(),
      REDIS_CONNECTION_STRING: import_celebrate.Joi.string().optional(),
      DB_URL: import_celebrate.Joi.string().optional()
    };
  }
  static get values() {
    return {
      HOST: process.env.HOST ?? "localhost",
      PORT: process.env.PORT ?? 2e3,
      REDIS_CONNECTION_STRING: process.env.REDIS_CONNECTION_STRING,
      DB_URL: process.env.DB_URL
    };
  }
}
__name(Base, "Base");
const config = Base.values;
const { error } = import_celebrate.Joi.object(Base.schema).validate(config);
if (error) {
  console.error(`Environment validation failed. 
Details - ${error.details[0].message}
Exiting...`);
  process.exit(1);
}
var config_default = config;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=index.js.map
