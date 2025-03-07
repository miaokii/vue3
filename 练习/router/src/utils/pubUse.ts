// src/utils/pubUse.ts
export const utils = {
    getImage(name: string) {
        let path = '/images'
        if (!name.startsWith('/')) {
            path += '/'
        }
        path += name
        return path
    },
    
    appConfig: {
        name: 'Vite App',
        version: '1.0.0',
    }
};