function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
    symbols: [
        "♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"
    ],
    // reels：[ { position: 4 }, { position: 6 }, { position: 2 } ]，this 是 reels[0]、reels[1]、reels[2]
    spin() {
        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1);
        }
        // 调用spin创建position属性
        this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
    },
    // this 是 slot
    display() {
        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1);
        }
        return this.symbols[this.position];
    }
};

var slotMachine = {
    /*reels: [
        // this slot machine needs 3 separate reels
        // hint: Object.create(..)
    ],*/
    reels: [
        Object.create(reel),
        Object.create(reel),
        Object.create(reel)
    ],
    spin() {
        this.reels.forEach(function spinReel(reel){
            reel.spin();
        });
        console.log(this.reels);
        // reels：[ { position: 4 }, { position: 6 }, { position: 2 } ]
    },
    display() {
        // TODO
        var lines = [];
        // display all 3 lines on the slot machine
        for (let linePos = -1; linePos <= 1; linePos++) {
            let line = this.reels.map(
                function getSlot(reel){
                    var slot = Object.create(reel);
                    slot.position = (reel.symbols.length + reel.position + linePos) % reel.symbols.length;
                    return slot.display();
                }
            );
            lines.push(line.join(" | "));
        }
        return lines.join("\n");
    }
};

slotMachine.spin();
// slotMachine.display();
console.log(slotMachine.display());
// ☾ | ☀ | ★
// ☀ | ♠ | ☾
// ♠ | ♥ | ☀

slotMachine.spin();
// slotMachine.display();
console.log(slotMachine.display());
// ♦ | ♠ | ♣
// ♣ | ♥ | ☺
// ☺ | ♦ | ★