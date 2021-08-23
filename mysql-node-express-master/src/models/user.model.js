const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
class UserModel {
    tableName = 'account';

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

    // findOnebookmark = async (params) => {
    //     const { columnSet, values } = multipleColumnSet(params)

    //     const sql = `SELECT * FROM bookmark
    //     WHERE ${columnSet}`;

    //     const result = await query(sql, [...values]);

    //     // return back the first row (user)
    //     return result[0];
    // }

    create = async ({ email, password, username, profile, photo_link, role= 0 ,club_id= 1}) => {
        const sql = `INSERT INTO ${this.tableName}
        (email, password, username, profile, photo_link, role, club_id) VALUES (?,?,?,?,?,?,?)`;

        const result = await query(sql, [email, password, username, profile, photo_link, role, club_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }


    createfollow = async (follower_id,following_id) => {
        const sql = `INSERT INTO follower (follower_id, following_id) VALUES (?,?)`;

        const result = await query(sql, [follower_id,following_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    deletefollow = async (follower_id,following_id) => {
        const sql = `DELETE FROM follower WHERE follower_id = ? && following_id = ?`;

        const result = await query(sql, [follower_id,following_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    likelike = async (tablename, a, b, clap) => {
        if (tablename == 'likearticle'){
            const sql = `INSERT INTO likearticle (account_id, article_id, clap) VALUES (?,?,?)`;    
            const result = await query(sql, [a, b, clap]);
            const affectedRows = result ? result.affectedRows : 0;
    
            return affectedRows;
        }
        if (tablename == 'likecomment'){
            const sql = `INSERT INTO likecomment (user_id, comment_id, clap) VALUES (?,?,?)`;    
            const result = await query(sql, [a, b, clap]);
            const affectedRows = result ? result.affectedRows : 0;
    
            return affectedRows;
        }
    }

    createBookmark = async (account_id, article_id) => {
        const sql = `INSERT INTO bookmark(account_id, article_id) VALUES (?,?)`;

        const result = await query(sql, [account_id, article_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    deleteBookmark = async (account_id, article_id) => {
        const sql = `DELETE FROM bookmark WHERE account_id = ? && article_id = ?`;

        const result = await query(sql, [account_id, article_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }


    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE account SET ${columnSet} WHERE id = ?`;

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

module.exports = new UserModel;