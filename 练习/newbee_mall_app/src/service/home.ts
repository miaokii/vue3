import { type HomeInfos } from "@/interfaces/Home";
import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";
import { type Response } from "@/utils/Response";
import { home_infos } from "./jsons";

export function getHome() {
  // return APIClient.get<HomeInfos>(URLEnum.home_index_infos)
  return new Promise<Response<HomeInfos>>((resolve) => {
    setTimeout(() => {
      resolve(home_infos);
    }, 500);
  });
}