const f = function () {
    console.log(new.target === f);
}

f() // false
new f() // true