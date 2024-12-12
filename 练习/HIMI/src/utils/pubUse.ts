export default function getAssetsImages(name: string) {
    // 无法识别name
    let urlstr = `../assets/images/${name}`
    let url = new URL(urlstr, import.meta.url).href
    return url
}