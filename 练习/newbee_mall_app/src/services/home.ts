import { type HomeInfos } from "@/interfaces/Home";
import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";
import { type Response } from "@/utils/Response";

export function getHome() {
  return APIClient.get<Response<HomeInfos>>(URLEnum.home_index_infos)
}