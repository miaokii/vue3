// 返回图片
// export const useImagePath = () => {
//     const getPageImage = (pagename: string, imageName: string): string => {
//         return `assets/images/${pagename}/${imageName}`;
//     }

//     const getImage = (path: string): string => {
//         let fullPath = 'assets/images'
//         if (!path.startsWith('/')) {
//             path += '/'
//         }
//         fullPath += path
//         return fullPath
//     }

//     // const getImage = (page: string, name: string) => {
//     //     try {
//     //         return new URL(`/assets/image/${page}/${name}`, import.meta.url).href
//     //     } catch {
//     //         return '/fallback-image.png'
//     //     }
//     // }

//     return { getPageImage, getImage}
// }

export const getPageImage = (pagename: string, imageName: string): string => {
    return `/images/${pagename}/${imageName}`;
}

export const getImage = (path: string): string => {
    let fullPath = '/images'
    if (!path.startsWith('/')) {
        fullPath += '/'
    }
    fullPath += path
    return fullPath
}