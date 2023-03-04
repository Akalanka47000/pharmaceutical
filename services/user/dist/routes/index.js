var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_fs = __toESM(require("fs"));
var import_express = __toESM(require("express"));
var _a;
const router = import_express.default.Router();
(_a = import_fs.default.readdirSync(`${__dirname}/../modules`)) == null ? void 0 : _a.forEach((module2) => {
  var _a2;
  (_a2 = import_fs.default.readdirSync(`${__dirname}/../modules/${module2}/api`)) == null ? void 0 : _a2.forEach((v) => {
    router.use(`/${v}/${module2}`, require(`../modules/${module2}/api/${v}/controller`).default);
  });
});
var routes_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=index.js.map
