export default function getAssetsImages(name: string) {
    let path = '/images'
    if (!name.startsWith('/')) {
        path += '/'
    }
    path += name
    return path
}