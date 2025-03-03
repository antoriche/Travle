import { CLOUD } from "./constants";

Object.assign(module.exports, require("./constants"));

switch (CLOUD) {
  case "azure":
    Object.assign(module.exports, require("./Azure"));
    break;
  case "aws":
    Object.assign(module.exports, require("./AWS"));
    break;
  case undefined:
    throw new Error("No cloud provider specified, please set the CLOUD environment variable to either 'azure' or 'aws'");
  default:
    throw new Error(`Unknown cloud provider ${CLOUD}`);
}
