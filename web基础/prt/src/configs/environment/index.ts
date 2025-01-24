import { devEnv, testEnv, pressureEnv, prodEnv } from "./prod";
import { developmentEnv } from "./dev";
import * as erpEnv from "./erp";
import { Environments } from "./type";
const replaceErpEnv = Object.entries(erpEnv).map(([key, value]) => [
  key.replace(/_/, "-"),
  value,
]);
const allEnvs: Recordable<Environments> = {
  dev: devEnv,
  test: testEnv,
  pressure: pressureEnv,
  prod: prodEnv,
  development: developmentEnv,
  ...Object.fromEntries(replaceErpEnv),
};

let vueAppEnv = process.env.VUE_APP_ENV;
if (process.env.NODE_ENV !== "production") {
  vueAppEnv = "test";
}

export const environment = allEnvs[vueAppEnv];
