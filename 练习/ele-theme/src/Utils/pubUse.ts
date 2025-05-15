export function getImage(name: string) {
    let path = '/images'
    if (!name.startsWith('/')) {
        path += '/'
    }
    path += name
    return path
}