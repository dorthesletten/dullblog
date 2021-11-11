// setup connection ------------------
const pg = require('pg');
const dbURI = "postgres://inoglqwfenvpth:de6040083a206c29d50d07803c2524fafe50e5b7c1c547633fb107819e6864d8@ec2-63-33-14-215.eu-west-1.compute.amazonaws.com:5432/dadl71ika20d4c";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: {rejectUnauthorized: false }
});

// database methods -----------------
let dbMethods = {}; //create empty project

// -----------------------------------
dbMethods.getAllBlogPosts = function() {
    let sql = "SELECT *FROM blogposts";
    return pool.query(sql); //return the promise
}

// ------------------------------------
dbMethods.createBlogPost = function(heading, blogtext, userid) {
    let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
    let values = [heading, blogtext, userid];
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
dbMethods.deleteBlogPost = function(id) {
    let sql = "DELETE FROM blogposts WHERE id = $1 RETURNING *";
}

// export dbMethods -------------------
module.exports = dbMethods;