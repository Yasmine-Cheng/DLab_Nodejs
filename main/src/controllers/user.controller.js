// const { create } = require("../models/user.model");

// const { genSaltSync, hashSync } = require("bcrypt");

// module.exports = {
//     createUser: (req, res) => {
//         const body = req.body;
//         const salt = genSaltSync(10);
//         body.password = hashSync(body.password, salt);
//         create(body, (err, results) => {
//           if (err) {
//             console.log(err);
//             return res.status(500).json({
//               success: 0,
//               message: "Database connection error"
//             });
//           }
//           return res.status(200).json({
//             success: 1,
//             data: results
//           });
//         });
//       }
// };


const {create,getUserByUserEmail,getUserByUserId,getUsers,updateUser,deleteUser,getUserProfile} = require("../models/user.model");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      const result = compareSync.toString((body.password, results.password));
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUserProfile: (req, res) => {
    const decoded = JSON.parse(JSON.stringify(req.decoded.result));
    getUserProfile(decoded, (err, results) => {
      if (err) {
        console.log(err);
        return
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      return res.json({
        success: 1,
        data: results.profile
      });
    });
  }
};