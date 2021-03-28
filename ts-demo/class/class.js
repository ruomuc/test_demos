var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
    Student.prototype.greeter = function (person) {
        return 'Hello, ' + person.firstName + ' ' + person.lastName;
    };
    return Student;
}());
var Monitor = /** @class */ (function (_super) {
    __extends(Monitor, _super);
    function Monitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Monitor;
}(Student));
var user = new Student('Jane', 'M.', 'User');
var monitor = new Monitor('Zm', 'a', 'b');
// console.log(user)
// console.log(monitor)
user.greeter = function (person) {
    console.log('changed greeter');
    return '1';
};
console.log(user.greeter(user));
console.log(user.greeter(monitor));
