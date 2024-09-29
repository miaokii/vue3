// 定义一个接口，接口内的属性name、id、age
// export 表示单个暴露
export interface PersonInterface {
    name: string,
    age: number,
    id: string,
    // 可选类型
    gender?:number
}

// 给一个person数组取别名为PersonList
export type PersonList = Array<PersonInterface>
// 另一种写法
export type Persons = PersonInterface[]