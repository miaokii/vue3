// 首页轮播
export interface HomeCarousel {
    carouselUrl: string
    redirectUrl: string
}

// 商品信息
export interface Goods {
    goodsId: string
    goodsName: string
    goodsIntro: string
    goodsCoverImg: string
    sellingPrice: number
    tag: string
}   

// 首页信息
export interface HomeInfos {
    carousels: HomeCarousel[]
    hotGoodses: Goods[]
    newGoodses: Goods[]
    recommendGoodses: Goods[]
}
