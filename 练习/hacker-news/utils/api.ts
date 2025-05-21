export const feedsInfo = {
    news: {
        title: 'News', pages: 10
    },
    newest: {
        title: 'Newest', pages: 12
    },
    ask: {
        title: 'Ask', pages: 2
    },
    show: {
        title: 'Show', pages: 2
    },
    jobs: {
        title: 'Jobs', pages: 1
    },    
}

/// 获取所有有效的 feeds
export const validFeeds = Object.keys(feedsInfo)