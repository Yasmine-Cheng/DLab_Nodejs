const pool = require("../../config/db.config");

module.exports = {
  create: (data, callBack) => {
    pool.query(
        `insert into account(email, password, username, profile, photo_link, role) value(?,?,?,?,?,?)`,
        [	
            data.email,
            data.password,
            data.username,
            data.profile,
            data.photo_link,
            data.role
        ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  // getrolebyID: (id, callBack) => {
  //   pool.query(
  //   `select role from article where account_id = ?`,
  //   [id],
  //   (error, results, fields) => {
  //     if (error) {
  //       callBack(error);
  //     }
  //     return callBack(null, results[0]);
  //   });
  // },
  getPremiumUsers: callBack => {
    pool.query(
      `select account_id, email, username, profile, photo_link from account where role = '1'`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from account where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserProfile: (decoded, callBack) => {
    pool.query(
      `select profile from account where account_id = ?`,
      [decoded],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select account_id, email, password, username, profile, photo_link, role from account where account_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select account_id, email, password, username, profile, photo_link, role from account`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update account set account_id=?, email=?, password=?, username=?, profile=?, photo_link=?, role=? where account_id = ?`,
      [
        data.account_id,	
        data.email,
        data.password,
        data.username,
        data.profile,
        data.photo_link,
        data.role,
        data.account_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from account where account_id = ?`,
      [data.account_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};