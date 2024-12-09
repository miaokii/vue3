export default function getAssetsImages(name: string) {
    // 无法识别name
    // let url = new URL(`@/assets/images/${name}`, import.meta.url).href
    
    let url = new URL(`@/assets/images`, import.meta.url).href
    if (!name.startsWith('/')) {
        url += '/'
    }
    url += name

    return url
}