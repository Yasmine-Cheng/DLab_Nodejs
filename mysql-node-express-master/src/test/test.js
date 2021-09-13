// const assert = require('assert');
// describe('Simple Math Test', () => {
//  it('should return 2', () => {
//         assert.equal(1 + 1, 2);
//     });
//  it('should return 9', () => {
//         assert.equal(3 * 3, 9);
//     });
// });
// const expect = require('chai').expect;
// describe('Simple Math Test', () => {
//  it('should return 2', () => {
//         expect(1 + 1).to.equal(2);
//     });
//  it('should return 9', () => {
//         expect(3 * 3).to.equal(9);
//     });
// });
// article.test.js
/* global describe it before */
// article.test.js
/* global describe it before */
const { expect } = require('chai');
const supertest = require('supertest');
require('../server');

const api = supertest('http://localhost:3331/api/v1'); // 定義測試的 API 路徑
let APItoken; // 全域變數等待 before() 取得 Token

describe('Article', () => {
  it('should return a 200 response and login success', (done) => {
    api.post('/articles/login') // 登入測試
      .set('Accept', 'application/json')
      .send({
        email: '22222@gmail.com',
        password: '22222'
      })
      .expect(200)
      .end((err, res) => {
        APItoken = res.body.token; // 登入成功取得 JWT
        console.log(APItoken)
        done();
      });
    });
  });