
'use strict'

const fs = require('fs');

module.exports = function(app, db, fc) {
  var path = '/addons/ant.install';
  //@客户端脚本
  app.route(path + '/client.js')
    .get(function(req, res) {
      fc.sendFile(req, res, __dirname + '/client.min.js');
    })
  app.route(path + '/install')
    .post(function(req, res) {
      if(fc.isinstall()) {
        // 已经安装
        res.json({
          err: '已安装过,请不要重复安装',
          ret: false
        });
        return
      }
      // 创建管理员
      var create_admin = req.body.create_admin || {};
      if(Object.keys(create_admin).length > 0) {
        var mdb = db.get('user');
        var _email = fc.toStr(create_admin.email),
          _nickname = fc.toStr(create_admin.nickname),
          _passwd = fc.md5(fc.toStr(create_admin.password)),
          _passwd1 = fc.md5(fc.toStr(create_admin.password1));
        if(_passwd !== _passwd1) {
          res.json({
            err: '创建管理员失败, 两次密码不一致',
            ret: false
          })
          return
        }
        mdb.findOne({
          email: _email
        }, function(err, ret) {
          if(!ret) { // 邮箱不存在
            mdb.findOne({
              nickname: _nickname
            }, function(err1, ret1) {
              if(!ret1){
                // 开始注册
                new mdb({
                  email: _email,
                  coin: 1000,
                  isadmin: true,
                  verify: true,
                  nickname: _nickname,
                  password: _passwd,
                  config: '',
                  regip: fc.getIP(req),
                  loginip: fc.getIP(req),
                  regtime: new Date(),
                  logintime: new Date(),
                  buy_bomb: true
                }).save(function(err2, ret2){
                  if(!ret2){
                    res.json({
                      err: err2,
                      ret: false
                    });
                    return;
                  }
                })
              }else{
                res.json({
                  err: '昵称已存在!',
                  ret: false
                })
                return;
              }
            })
          }else{
            res.json({
              err: '邮箱已存在!',
              ret: false
            })
            return;
          }
        });
      }else{
        // 未获取管理员
        res.json({
          err: '未创建管理员',
          ret: false,
        })
        return;
      }
      fs.writeFileSync('install.lock', '1');
      res.json({
        ret: true
      })
    })
}