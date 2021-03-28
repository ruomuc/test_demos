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
    function Student(p, c) {
        this.fullName = "" + p.firstName + p.lastName;
        this.height = c.height;
        this.weight = c.weight;
        this.hobby = c.hobby;
    }
    Student.prototype.greeter = function () {
        console.log("Hello, " + this.fullName);
    };
    Student.prototype.getWeight = function () {
        console.log(this.fullName + "'s weight is " + this.weight + "kg");
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
var user = new Student({ firstName: 'y', lastName: 'm' }, { height: 160, weight: 55, hobby: 'cycling' });
var monitor = new Monitor({ firstName: 'Z', lastName: 'm' }, { height: 180, weight: 68, hobby: 'drawing' });
user.greeter();
user.getWeight();
monitor.greeter();
