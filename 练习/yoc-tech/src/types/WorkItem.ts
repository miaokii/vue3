// 定义一个接口，接口内的属性title、content、image
// export 表示单个暴露
export interface WorkItem {
    title: string,
    content: string[],
    image: string
}

// 数组取别名为WorkItemList
export type WorkItemList = Array<WorkItem>
// 另一种写法
// export type Persons = WorkItem[]
