
// 分类接口
export interface Category {
    categoryId: number
    categoryLevel: number
    categoryName: string
}

// 商品二级分类
export interface CategorySecondVOS extends Category {
    parentId: number
    thirdLevelCategoryVOS: Category[]
}

// 商品分类
export interface GoodsCategory extends Category {
    secondLevelCategoryVOS: CategorySecondVOS[]
}