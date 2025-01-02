import { type HomeInfos } from "@/interfaces/Home";
import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";
import { type Response } from "@/utils/Response";
import home_info from "./home_info";

export function getHome() {
  // return APIClient.get<Response<HomeInfos>>(URLEnum.home_index_infos)
  return new Promise<Response<HomeInfos>>((resolve) => {
    setTimeout(() => {
      resolve(home_info);
    }, 500);
  }).then((res) => res.data);
}