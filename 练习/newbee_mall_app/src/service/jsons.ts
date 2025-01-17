import type { GoodsCategory } from "@/interfaces/Category"
import type { HomeInfos } from "@/interfaces/Home"
import type { Response } from "@/utils/Response"

// 首页json数据
export const home_infos: Response<HomeInfos> = {
    "resultCode": 200,
    "message": "SUCCESS",
    "data": {
        "carousels": [
            {
                "carouselUrl": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-mate60.png",
                "redirectUrl": "https://juejin.im/book/6844733826191589390"
            },
            {
                "carouselUrl": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-matex5.png",
                "redirectUrl": "https://juejin.im/book/6844733826191589390"
            },
            {
                "carouselUrl": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-p60-pro-white.png",
                "redirectUrl": "https://juejin.im/book/6844733826191589390"
            }
        ],
        "hotGoodses": [
            {
                "goodsId": 10918,
                "goodsName": "Apple AirPods (第三代)",
                "goodsIntro": "AirPods第三代搭载空间音频和自适应均衡...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/MME73_AV4_GEO_CN.jpeg",
                "sellingPrice": 1399,
                "tag": "美妙新声"
            },
            {
                "goodsId": 10908,
                "goodsName": "HUAWEI Mate 40 Pro 全网通5G手机 8GB...",
                "goodsIntro": "5nm麒麟9000旗舰芯片 | 超感光徕卡电...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/mate40-white.png",
                "sellingPrice": 6488,
                "tag": "跃见非凡"
            },
            {
                "goodsId": 10906,
                "goodsName": "Apple iPhone12 Pro (A2408) 128...",
                "goodsIntro": "A14仿生芯片，6.1英寸超视网膜XDR显示...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/iphone-12-pro-blue-hero.png",
                "sellingPrice": 8499,
                "tag": "自我再飞跃"
            },
            {
                "goodsId": 10902,
                "goodsName": "华为 HUAWEI P40 冰霜银 全网通5G手机",
                "goodsIntro": "麒麟990 5G SoC芯片 5000万超感...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/p40-silver.png",
                "sellingPrice": 4299,
                "tag": "超感知影像"
            }
        ],
        "newGoodses": [
            {
                "goodsId": 10933,
                "goodsName": "【旗舰新品】HUAWEI/华为Mate50 Pro 昆仑破晓...",
                "goodsIntro": "曲面屏超光变XMAGE影像鸿蒙3.0拍照摄影...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/mate-50-pro-black.png",
                "sellingPrice": 7899,
                "tag": "领势而上"
            },
            {
                "goodsId": 10931,
                "goodsName": "iPhone 14 Pro 暗紫色 512G",
                "goodsIntro": "A16仿生芯片，4800万像素主摄，超瓷晶面...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/iphone-14-pro-purple.jpg",
                "sellingPrice": 10599,
                "tag": "强力出圈"
            },
            {
                "goodsId": 10932,
                "goodsName": "华为Mate50 Pro 昆仑霞光 512G",
                "goodsIntro": "曲面屏超光变XMAGE影像鸿蒙3.0拍照摄影...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/mate-50-pro-light.png",
                "sellingPrice": 7899,
                "tag": "领势而上"
            },
            {
                "goodsId": 10934,
                "goodsName": "Apple MacBook Pro 13英寸 16G+512...",
                "goodsIntro": "m2 芯片 8核中央处理器 10核图形处理器",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/mbp-m2-202206.jpg",
                "sellingPrice": 10799,
                "tag": "超机动，硬实力"
            },
            {
                "goodsId": 10921,
                "goodsName": "HUAWEI P50 Pro 4G全网通 8GB+512GB...",
                "goodsIntro": "麒麟9000芯片,万象双环设计",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/p50-gold.png",
                "sellingPrice": 7488,
                "tag": "万象新生"
            }
        ],
        "recommendGoodses": [
            {
                "goodsId": 10922,
                "goodsName": "HUAWEI P50 雪域白",
                "goodsIntro": "骁龙888,4G全网通,原色双影像单元,万象...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/p50-white.png",
                "sellingPrice": 4488,
                "tag": "万象新生"
            },
            {
                "goodsId": 10930,
                "goodsName": "华为FreeBuds Pro无线耳机",
                "goodsIntro": "主动降噪真无线蓝牙耳机/入耳式耳机/环境音/...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/freebuds-pro.png",
                "sellingPrice": 749,
                "tag": "动态降噪 听我想听"
            },
            {
                "goodsId": 10937,
                "goodsName": "iPhone 14 Pro 金色 512G",
                "goodsIntro": "A16仿生芯片，4800万像素主摄，超瓷晶面...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/iphone-14-pro-gold.jpg",
                "sellingPrice": 10599,
                "tag": "强力出圈"
            },
            {
                "goodsId": 10927,
                "goodsName": "HUAWEI MatePad Pro 12.6英寸",
                "goodsIntro": "8+256GB WIFI曜石灰 麒麟9000...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/matepad-pro.png",
                "sellingPrice": 4699,
                "tag": "创造无界"
            },
            {
                "goodsId": 10920,
                "goodsName": "MacBook Pro 16英寸 M1 Pro芯片",
                "goodsIntro": "16G 512G 银色。M1Pro和M1Ma...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/mbp16-silver-select-202110_GEO_CN.jpeg",
                "sellingPrice": 18999,
                "tag": "强者的强"
            },
            {
                "goodsId": 10929,
                "goodsName": "华为 HUAWEI Sound X 2021",
                "goodsIntro": "智能音箱幻彩光随声动",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/soundx.png",
                "sellingPrice": 2199,
                "tag": "声声出色"
            },
            {
                "goodsId": 10928,
                "goodsName": "HUAWEI WATCH 3 Pro智能手表",
                "goodsIntro": "运动智能手表 尊享款 eSIM独立通话强劲续...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/watch-3-pro.png",
                "sellingPrice": 3899,
                "tag": "一表万象"
            },
            {
                "goodsId": 10233,
                "goodsName": "纪梵希高定香榭天鹅绒唇膏306#",
                "goodsIntro": "(小羊皮口红 法式红 雾面哑光 持久锁色）新...",
                "goodsCoverImg": "/goods-img/04949c0e-87df-445b-96dd-29e7fc69f734.jpg",
                "sellingPrice": 355,
                "tag": "雾面哑光 持久锁色"
            },
            {
                "goodsId": 10907,
                "goodsName": "HUAWEI Mate 40 Pro 全网通5G手机 8GB...",
                "goodsIntro": "5nm麒麟9000旗舰芯片 | 超感光徕卡电...",
                "goodsCoverImg": "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/mate40-silver.png",
                "sellingPrice": 6488,
                "tag": "跃见非凡"
            },
            {
                "goodsId": 10154,
                "goodsName": "无印良品 MUJI 塑料浴室座椅",
                "goodsIntro": "原色",
                "goodsCoverImg": "/goods-img/15395057-94e9-4545-a8ee-8aee025f40c5.jpg",
                "sellingPrice": 85,
                "tag": "无印良品"
            }
        ]
    }
}

// 分类json数据
export const category_infos: Response<GoodsCategory[]> = {
    "resultCode": 200,
    "message": "SUCCESS",
    "data": [
        {
            "categoryId": 15,
            "categoryLevel": 1,
            "categoryName": "家电 数码 手机",
            "secondLevelCategoryVOS": [
                {
                    "categoryId": 17,
                    "parentId": 15,
                    "categoryLevel": 2,
                    "categoryName": "家电",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 20,
                            "categoryLevel": 3,
                            "categoryName": "生活电器"
                        },
                        {
                            "categoryId": 110,
                            "categoryLevel": 3,
                            "categoryName": "wer"
                        },
                        {
                            "categoryId": 21,
                            "categoryLevel": 3,
                            "categoryName": "厨房电器"
                        },
                        {
                            "categoryId": 22,
                            "categoryLevel": 3,
                            "categoryName": "扫地机器人"
                        },
                        {
                            "categoryId": 23,
                            "categoryLevel": 3,
                            "categoryName": "吸尘器"
                        },
                        {
                            "categoryId": 24,
                            "categoryLevel": 3,
                            "categoryName": "取暖器"
                        },
                        {
                            "categoryId": 25,
                            "categoryLevel": 3,
                            "categoryName": "豆浆机"
                        },
                        {
                            "categoryId": 26,
                            "categoryLevel": 3,
                            "categoryName": "暖风机"
                        },
                        {
                            "categoryId": 27,
                            "categoryLevel": 3,
                            "categoryName": "加湿器"
                        },
                        {
                            "categoryId": 28,
                            "categoryLevel": 3,
                            "categoryName": "蓝牙音箱"
                        },
                        {
                            "categoryId": 29,
                            "categoryLevel": 3,
                            "categoryName": "烤箱"
                        },
                        {
                            "categoryId": 30,
                            "categoryLevel": 3,
                            "categoryName": "卷发器"
                        },
                        {
                            "categoryId": 31,
                            "categoryLevel": 3,
                            "categoryName": "空气净化器"
                        }
                    ]
                },
                {
                    "categoryId": 18,
                    "parentId": 15,
                    "categoryLevel": 2,
                    "categoryName": "数码",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 32,
                            "categoryLevel": 3,
                            "categoryName": "游戏主机"
                        },
                        {
                            "categoryId": 43,
                            "categoryLevel": 3,
                            "categoryName": "二手手机"
                        },
                        {
                            "categoryId": 33,
                            "categoryLevel": 3,
                            "categoryName": "数码精选"
                        },
                        {
                            "categoryId": 34,
                            "categoryLevel": 3,
                            "categoryName": "平板电脑"
                        },
                        {
                            "categoryId": 35,
                            "categoryLevel": 3,
                            "categoryName": "苹果 Apple"
                        },
                        {
                            "categoryId": 36,
                            "categoryLevel": 3,
                            "categoryName": "电脑主机"
                        },
                        {
                            "categoryId": 37,
                            "categoryLevel": 3,
                            "categoryName": "数码相机"
                        },
                        {
                            "categoryId": 38,
                            "categoryLevel": 3,
                            "categoryName": "电玩动漫"
                        },
                        {
                            "categoryId": 39,
                            "categoryLevel": 3,
                            "categoryName": "单反相机"
                        },
                        {
                            "categoryId": 40,
                            "categoryLevel": 3,
                            "categoryName": "键盘鼠标"
                        },
                        {
                            "categoryId": 41,
                            "categoryLevel": 3,
                            "categoryName": "无人机"
                        },
                        {
                            "categoryId": 42,
                            "categoryLevel": 3,
                            "categoryName": "二手电脑"
                        }
                    ]
                },
                {
                    "categoryId": 19,
                    "parentId": 15,
                    "categoryLevel": 2,
                    "categoryName": "手机",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 45,
                            "categoryLevel": 3,
                            "categoryName": "荣耀手机"
                        },
                        {
                            "categoryId": 46,
                            "categoryLevel": 3,
                            "categoryName": "华为手机"
                        },
                        {
                            "categoryId": 49,
                            "categoryLevel": 3,
                            "categoryName": "华为 P30"
                        },
                        {
                            "categoryId": 44,
                            "categoryLevel": 3,
                            "categoryName": "iPhone 11"
                        },
                        {
                            "categoryId": 47,
                            "categoryLevel": 3,
                            "categoryName": "苹果 iPhone"
                        },
                        {
                            "categoryId": 48,
                            "categoryLevel": 3,
                            "categoryName": "华为 Mate 20"
                        },
                        {
                            "categoryId": 51,
                            "categoryLevel": 3,
                            "categoryName": "小米手机"
                        },
                        {
                            "categoryId": 53,
                            "categoryLevel": 3,
                            "categoryName": "OPPO"
                        },
                        {
                            "categoryId": 54,
                            "categoryLevel": 3,
                            "categoryName": "一加"
                        },
                        {
                            "categoryId": 55,
                            "categoryLevel": 3,
                            "categoryName": "小米 MIX"
                        },
                        {
                            "categoryId": 56,
                            "categoryLevel": 3,
                            "categoryName": "Reno"
                        },
                        {
                            "categoryId": 57,
                            "categoryLevel": 3,
                            "categoryName": "vivo"
                        },
                        {
                            "categoryId": 58,
                            "categoryLevel": 3,
                            "categoryName": "手机以旧换新"
                        }
                    ]
                }
            ]
        },
        {
            "categoryId": 16,
            "categoryLevel": 1,
            "categoryName": "女装 男装 穿搭",
            "secondLevelCategoryVOS": [
                {
                    "categoryId": 67,
                    "parentId": 16,
                    "categoryLevel": 2,
                    "categoryName": "女装",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 76,
                            "categoryLevel": 3,
                            "categoryName": "外套"
                        }
                    ]
                }
            ]
        },
        {
            "categoryId": 61,
            "categoryLevel": 1,
            "categoryName": "家具 家饰 家纺",
            "secondLevelCategoryVOS": [
                {
                    "categoryId": 70,
                    "parentId": 61,
                    "categoryLevel": 2,
                    "categoryName": "家具",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 77,
                            "categoryLevel": 3,
                            "categoryName": "沙发"
                        }
                    ]
                }
            ]
        },
        {
            "categoryId": 59,
            "categoryLevel": 1,
            "categoryName": "运动 户外 乐器",
            "secondLevelCategoryVOS": [
                {
                    "categoryId": 73,
                    "parentId": 59,
                    "categoryLevel": 2,
                    "categoryName": "运动",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 78,
                            "categoryLevel": 3,
                            "categoryName": "跑鞋"
                        }
                    ]
                }
            ]
        },
        {
            "categoryId": 60,
            "categoryLevel": 1,
            "categoryName": "游戏 动漫 影视",
            "secondLevelCategoryVOS": [
                {
                    "categoryId": 79,
                    "parentId": 60,
                    "categoryLevel": 2,
                    "categoryName": "游戏",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 82,
                            "categoryLevel": 3,
                            "categoryName": "LOL"
                        }
                    ]
                }
            ]
        },
        {
            "categoryId": 62,
            "categoryLevel": 1,
            "categoryName": "美妆 清洁 宠物",
            "secondLevelCategoryVOS": [
                {
                    "categoryId": 83,
                    "parentId": 62,
                    "categoryLevel": 2,
                    "categoryName": "美妆",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 86,
                            "categoryLevel": 3,
                            "categoryName": "口红"
                        },
                        {
                            "categoryId": 104,
                            "categoryLevel": 3,
                            "categoryName": "睫毛膏"
                        },
                        {
                            "categoryId": 103,
                            "categoryLevel": 3,
                            "categoryName": "腮红"
                        },
                        {
                            "categoryId": 102,
                            "categoryLevel": 3,
                            "categoryName": "粉底"
                        },
                        {
                            "categoryId": 101,
                            "categoryLevel": 3,
                            "categoryName": "隔离霜"
                        },
                        {
                            "categoryId": 100,
                            "categoryLevel": 3,
                            "categoryName": "美白"
                        },
                        {
                            "categoryId": 99,
                            "categoryLevel": 3,
                            "categoryName": "气垫"
                        }
                    ]
                }
            ]
        },
        {
            "categoryId": 63,
            "categoryLevel": 1,
            "categoryName": "工具 装修 建材",
            "secondLevelCategoryVOS": [
                {
                    "categoryId": 87,
                    "parentId": 63,
                    "categoryLevel": 2,
                    "categoryName": "工具",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 90,
                            "categoryLevel": 3,
                            "categoryName": "转换器"
                        }
                    ]
                }
            ]
        },
        {
            "categoryId": 66,
            "categoryLevel": 1,
            "categoryName": "鞋靴 箱包 配件",
            "secondLevelCategoryVOS": [
                {
                    "categoryId": 95,
                    "parentId": 66,
                    "categoryLevel": 2,
                    "categoryName": "鞋靴",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 98,
                            "categoryLevel": 3,
                            "categoryName": "休闲鞋"
                        }
                    ]
                }
            ]
        },
        {
            "categoryId": 65,
            "categoryLevel": 1,
            "categoryName": "玩具 孕产 用品",
            "secondLevelCategoryVOS": [
                {
                    "categoryId": 115,
                    "parentId": 65,
                    "categoryLevel": 2,
                    "categoryName": "玩具",
                    "thirdLevelCategoryVOS": [
                        {
                            "categoryId": 116,
                            "categoryLevel": 3,
                            "categoryName": "机器人"
                        }
                    ]
                }
            ]
        }
    ]
}