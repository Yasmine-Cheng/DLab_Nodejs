const { create,getPremiumUsers,getUserByUserEmail,getUserByUserId,getUserProfile,getUsers,updateUser,deleteUser } = require("../models/user.model");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const HttpException = require("../../utils/HttpException");

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
        // throw new HttpException(8,500);
      }
      return res.status(200).json({
        success: 1,
        data: body
      });
      // throw new HttpException(body,200);
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
        // return HttpException(2,401);
      }
      const result = compareSync.toString((body.password, results.password));
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "1 day"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
        // throw new HttpException(9,200,jsontoken);
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
        // throw new HttpException(2,401);
      }
    });
  },
  getPremiumUsers: (req, res) => {
    if (req.decoded.result.role == 1){
        getPremiumUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
        // throw new HttpException(results,200);
      });
    } 
    else {
      return res.json({
        success: 0,
        message: "Upgrade to Premium First XD ~"
      });
      // throw new HttpException(2,401);
    }
  },
  getUserProfile: (req, res) => {
    const account_id = req.decoded.result.account_id;
    getUserProfile(account_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found!!"
        });
        // throw new HttpException(0,404);
      }
      return res.json({
        success: 1,
        data: req.decoded.result.profile
      });
      // throw new HttpException(req.decoded.result.profile,200);
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
        console.log(req);
        return res.json({
          success: 0,
          message: "Record not Found"
        });
        // throw new HttpException(0,404);
      }
      return res.json({
        success: 1,
        data: results
      });
      // throw new HttpException(results,200);
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
      // throw new HttpException(results,200);
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
      // throw new HttpException(9,200);
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
        console.log(results)
        return res.json({
          success: 1,
          message: "user deleted successfully"
        });
        // throw new HttpException(0,404);
      }
      return res.json({
        success: 0,
        message: "Record Not Found"
      });
    });
  }
};