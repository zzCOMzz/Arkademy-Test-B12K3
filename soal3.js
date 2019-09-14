const cari_frasa = (input, search) => {
    if (search.length > input.length) {
        return `Paramater Inputan ${search} Tidak Boleh Lebih dari ${input}`;
    }
    const inputRev = String(input)
        .split("")
        .reverse()
        .join("");
    const normal = splicing(input, search);
    const balik = splicing(inputRev, search);
    return `Ditemukan ${normal + balik} kali`;
};

const splicing = (str, search) => {
    const arr = [];
    let end = search.length;
    for (let i = 0; i < str.length; i++) {
        const splitted = str
            .split("")
            .slice(i, end++)
            .join("");
        if (search.toLowerCase() === splitted.toLowerCase()) {
            arr.push(splitted);
        }
    }
    return arr.length;
};

console.log(cari_frasa("banananana", "nana"));
