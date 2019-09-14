const cetak = baris => {
    let randomString = "";
    const arr = [],
        karakter = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < baris; i++) {
        while (randomString.length <= 32) {
            const random = Math.floor(Math.random() * karakter.length);

            if (!randomString.includes(karakter[random])) {
                randomString += karakter[random];
            }
        }
        arr.push(randomString);
        randomString = "";
    }
    arr.forEach(str => console.log(str));
};

cetak(3);
