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
var response_exports = {};
__export(response_exports, {
  toSuccess: () => toSuccess
});
module.exports = __toCommonJS(response_exports);
var import_middleware = require("../middleware");
const toSuccess = /* @__PURE__ */ __name(({ res, status = 200, data, message }) => {
  (0, import_middleware.responseInterceptor)({}, res, () => {
  });
  if (res.polyglot)
    message = res.polyglot.t(message);
  const responseData = { data, message };
  if (!data)
    delete responseData.data;
  res.status(status).json(responseData);
}, "toSuccess");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  toSuccess
});
//# sourceMappingURL=response.js.map
