const router = require("express").Router();
const db = require("./lib/db");

const errorHandle = (res, err) => {
    console.log(err);
    res.status(500).json({ status: "Gagal!" });
};

router.get("/pegawai", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT n.id, n.name, w.id as id_work, w.name as work, s.salary, s.id as id_salary
            FROM \`Name\` n
            JOIN \`Work\` w ON  n.id_work = w.id
            JOIN \`Salary\` s ON  n.id_salary = s.id
         `);
        res.status(200).json({
            status: "Berhasil!",
            data: rows
        });
    } catch (error) {
        errorHandle(res, error);
    }
});

router.get("/work", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM `Work`");
        res.status(200).json({
            status: "Berhasil!",
            data: rows
        });
    } catch (error) {
        errorHandle(res, error);
    }
});

router.get("/salary", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM `Salary`");
        res.status(200).json({
            status: "Berhasil!",
            data: rows
        });
    } catch (error) {
        errorHandle(res, error);
    }
});

router.post("/pegawai", async (req, res) => {
    try {
        const [{ insertId }] = await db.query("INSERT INTO Name SET ?", {
            name: req.body.name,
            id_work: req.body.id_work,
            id_salary: req.body.id_salary
        });
        res.status(200).json({
            status: "Berhasil!",
            id: insertId,
            message: `Data ${req.body.name} berhasil ditambahkan!`
        });
    } catch (error) {
        errorHandle(res, error);
    }
});

router.put("/pegawai/:id", async (req, res) => {
    try {
        await db.query(
            "UPDATE `Name` SET `name` = ?, `id_work` = ?, `id_salary` = ? WHERE `id` = ?",
            [req.body.name, req.body.id_work, req.body.id_salary, req.params.id]
        );
        res.status(200).json({
            status: "Berhasil!",
            message: `Data ${req.body.name} Berhasil Diubah!`
        });
    } catch (err) {
        errorHandle(res, err);
    }
});

router.delete("/pegawai/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM `Name` WHERE `id` = ?", [req.params.id]);
        res.status(200).json({
            status: "Berhasil"
        });
    } catch (err) {
        errorHandle(res, err);
    }
});

module.exports = router;
