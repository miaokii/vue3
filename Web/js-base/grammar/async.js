class Person {
    constructor(name, age, gender, interests) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.interests = interests;
    }

    async greeting() {
        return await Promise.resolve(`Hi, I'm ${this.name}`);
    }

    farewell() {
        console.log(`${this.name} has left the building, bye for now`);
    }
}

let han = new Person('Lucy', 12, '男', ['study', 'shopping']);
han.greeting().then(console.log);