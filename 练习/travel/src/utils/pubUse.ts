export default function getAssetsImages(name: string) {
    return new URL(`../assets/images/${name}`, import.meta.url).href
}