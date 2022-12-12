// 实现下面计算器功能
function calculator() {
    // ..
}

var calc = calculator();

/*
calc("4");     // 4
calc("+");     // +
calc("7");     // 7
calc("3");     // 3
calc("-");     // -
calc("2");     // 2
calc("=");     // 75 4+73-2
calc("*");     // *
calc("4");     // 4
calc("=");     // 300 15*4
calc("5");     // 5
calc("-");     // -
calc("5");     // 5
calc("=");     // 0 5-5
*/

// 格式化输入
function useCalc(calc,keys) {
    return [...keys].reduce( // keys 4+3=
        function showDisplay(display,key){
            var ret = String( calc(key) ); // key 4
            console.log(ret)
            return (display + ( (ret != "" && key == "=") ? "=" : "" ) + ret);
        },
        ""
    );
}

// 格式化输出
function formatTotal(display) {
    if (Number.isFinite(display)) {
        // constrain display to max 11 chars
        let maxDigits = 11;
        // reserve space for "e+" notation?
        if (Math.abs(display) > 99999999999) {
            maxDigits -= 6;
        }
        // reserve space for "-"?
        if (display < 0) {
            maxDigits--;
        }

        // whole number?
        if (Number.isInteger(display)) {
            display = display
                .toPrecision(maxDigits)
                .replace(/\.0+$/,"");
        }
        // decimal
        else {
            // reserve space for "."
            maxDigits--;
            // reserve space for leading "0"?
            if (
                Math.abs(display) >= 0 &&
                Math.abs(display) < 1
            ) {
                maxDigits--;
            }
            display = display
                .toPrecision(maxDigits)
                .replace(/0+$/,"");
        }
    }
    else {
        display = "ERR";
    }
    return display;
}

// from earlier:
//
// function useCalc(..) { .. }
// function formatTotal(..) { .. }

function calculator1() {
    var currentTotal = 0;
    var currentVal = "";
    var currentOper = "=";

    return pressKey;

    function pressKey(key){ // key 4  +  3  =
        console.log('key  ' + key)
        if (/\d/.test(key)) { // number key
            currentVal += key;
            return key;
        } else if (/[+*/-]/.test(key)) { // operator key
            // multiple operations in a series?
            if (currentOper != "=" && currentVal != "") {
                // implied '=' keypress
                pressKey("=");
            } else if (currentVal != "") {
                currentTotal = Number(currentVal);
            }
            currentOper = key;
            currentVal = "";
            return key;
        } else if (key == "=" && currentOper != "=") { // = key
            currentTotal = op(
                currentTotal,
                currentOper,
                Number(currentVal)
            );
            currentOper = "=";
            currentVal = "";
            return formatTotal(currentTotal);
        }
        return "";
    };

    function op(val1,oper,val2) {
        var ops = {
            // NOTE: using arrow functions only for brevity in the book
            "+": (v1,v2) => v1 + v2,
            "-": (v1,v2) => v1 - v2,
            "*": (v1,v2) => v1 * v2,
            "/": (v1,v2) => v1 / v2
        };
        return ops[oper](val1,val2);
    }
}

var calc1 = calculator1();

console.log(useCalc(calc1,"4+3="));           // 4+3=7
// useCalc(calc1,"+9=");            // +9=16

useCalc(calc1,"*8=");            // *5=128
/*useCalc(calc1,"7*2*3=");         // 7*2*3=42
useCalc(calc1,"1/0=");           // 1/0=ERR
useCalc(calc1,"+3=");            // +3=ERR
useCalc(calc1,"51=");            // 51*!/*/
