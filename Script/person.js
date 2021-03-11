// class Person - basic unit to be entered to the database
// data is read from the api:
//[{"id":0,"firstName":"Adan","lastName":"Hajyahya","capsule":3}
//{"id":1,"age":27,"city":"Holon","gender":"Male","hobby":"Economics"}
class Person {
    constructor(id,firstName, lastName, capsule, age, city, gender, hobby) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.capsule = capsule;
        this.age = age;
        this.city = city;
        this.gender = gender;
        this.hobby = hobby;
    }
}