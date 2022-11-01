// 对象字面量
let empty_object = {};
let stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};
let flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};

// 给Object增加一个create方法,这个方法创建一个使用原对象作为其原型的新对象
if (typeof Object.beget !== 'function') {
    Object.create = function (o) {
        const F = function () {};
        F.prototype = o;
        return new F( );
    };
}
let another_stooge = Object.create(stooge);
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';
stooge.profession = 'actor'; // prototype原型是立即生效的
console.log(another_stooge.profession) // 'actor'


