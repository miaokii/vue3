import type { GoodsDetail } from "@/interfaces/Home";
import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";
import { ParallelHasher } from "ts-md5";

export function goodDetail(id: string | number) {
    return APIClient.get<GoodsDetail>(URLEnum.good_detail+`/${id}`)
}