"use strict";
(async () => {
    for (let i = 0; i < 10; i++) {
        await setTimeout(console.log, 2000, 666);
    }
})();
