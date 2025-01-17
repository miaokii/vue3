import type { GoodsCategory } from "@/interfaces/Category";
import type { Goods, GoodsDetail } from "@/interfaces/Home";
import APIClient from "@/utils/APIClient";
import { URLEnum } from "@/utils/APIEnum";
import { ParallelHasher } from "ts-md5";
import { type List, type Response } from "@/utils/Response";
import { category_infos } from "./jsons";

// 商品详情
export function goodDetail(id: string | number) {
    return APIClient.get<GoodsDetail>(URLEnum.goods_detail+`/${id}`)
}

// 商品类别
export function getCategory() {
    // return APIClient.get<GoodsCategory[]>(URLEnum.goods_category)
    return new Promise<Response<GoodsCategory[]>>((resolve) => {
        setTimeout(() => {
          resolve(category_infos);
        }, 500);
      });
}

export function search(param: object) {
    return APIClient.get<List<Goods>>(URLEnum.goods_search, param)
}