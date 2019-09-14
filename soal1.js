const biodata = () => ({
    name: "Muhammad Irvan Refnaldy",
    age: 21,
    address:
        "Jln. Tampomas No.33 ,  Kel. Muara Dua, Kec. Prabumulih Timur, Kota Prabumulih, Sumatera Selatan",
    hobbies: ["reading", "coding", "swimming"],
    is_married: false,
    list_school: [
        {
            name: "SD Negeri 01 Prabumulih",
            year_in: 2004,
            year_out: 2010,
            major: null
        },
        {
            name: "SMP Negeri 01 Prabumulih",
            year_in: 2010,
            year_out: 2013,
            major: null
        },
        {
            name: "SMA Negeri 07 Prabumulih",
            year_in: 2013,
            year_out: 2016,
            major: null
        },
        {
            name: "Politeknik Negeri Sriwijaya",
            year_in: 2016,
            year_out: 2019,
            major: "D3 Teknik Komputer"
        }
    ],
    skills: [
        {
            name: "Web Development",
            level: "Advanced"
        },
        {
            name: "Programming",
            level: "Advanced"
        },
        {
            name: "Android Development",
            level: "Beginner"
        }
    ],
    interest_in_coding: true
});

console.log(biodata());
