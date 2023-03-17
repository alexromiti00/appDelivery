const de = require('../config/config');
const Category = {};

Category.create = (category, result) =>{

    const sql =  `
    INSERT INTO
        categories(
            name,
            description,
            image,
            created_at,
            updated_at
        )
        VALUES(?, ?, ?, ?, ?)
            
    `;
        db.querry
            sql,
            [
                category.name,
                category.desription,
                category.image,
                new Date(),
                new Date()
            ],
            (err, res) => {
                if (err) {
                    console.log('Error:', err);
                    result(err, null);
                }
                else {
                    console.log('Id de la nueva categoria:', res.insertId);
                    result(null, res.insertId);
                }
            }

}