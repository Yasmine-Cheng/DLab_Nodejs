const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
class ArticleModel {
    tableName = 'article';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    findPageArticle = async (articleCount, perpage) => {
        const sql = `SELECT * FROM ${this.tableName}
        limit ?,?`;

        const result = await query(sql, [articleCount, perpage]);
        
        return result;
    }

    create = async ({ title, content, author_id, is_premium= 0 ,tag= 0}) => {
        const sql = `INSERT INTO ${this.tableName}
        (title, content, author_id, is_premium,tag) VALUES (?,?,?,?,?)`;

        const result = await query(sql, [title, content, author_id, is_premium,tag]);
        const affectedRows = result ? result.affectedRows : 0;


        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE article SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new ArticleModel;