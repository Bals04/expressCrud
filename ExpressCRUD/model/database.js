const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()


async function getNotes() {
    const [rows] = await pool.query(`SELECT * FROM studentstbl`)
    return rows
}


async function getNotebyID(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM studentstbl
    WHERE ID = ?
    `, [id])
    return rows[0]
}

async function create(Fname, Lname) {
    const result = await pool.query(`
    INSERT INTO studentstbl (Lastname, Firstname)
    VALUES (?,?)
    `, [Lname, Fname])
    return result
}

async function deleteByID(id) {
    const result = await pool.query(`
    DELETE FROM studentstbl
    WHERE ID = ?
    `, [id])
    return result
}

async function updateByID(id, fname, lname) {
    const result = await pool.query(`
    UPDATE studentstbl
    SET Firstname = '${fname}', Lastname = '${lname}' 
    WHERE ID = ${id};
    `, [fname], [lname], [id]);
    return result
}

module.exports = {
    getNotes,
    getNotebyID,
    create,
    deleteByID,
    updateByID
};