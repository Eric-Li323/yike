var User = require("./userdb.js");
var userdb = require("./userdbserver.js");
var message = require("./messagesdb.js");
var messagedb = require('./messagedbserver.js');
var date = require('./date.js');

exports.findUser = function(req,res,id){
    var myid = req.session.userId;
    var myimgurl = req.session.imgurl;
    var id = {'_id':id};
    var out = {'name':1,'imgurl':1,'online':1};
    User.find(id, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var context = {
            vacation : ress.map(function(ver){
                return {
                    id: ver._id,
                    name: ver.name,
                    imgurl: function(){
                        if(ver.imgurl){
                            return ver.imgurl;
                        }else{
                            return 'user.jpg';
                        }
                    },
                    online: ver.online,
                    myid: myid,
                    myimgurl: myimgurl,
                }
            })
        };
        res.render('chart',context);
        //res.redirect('/chart',context);
        }
    });
};

//获取数据库聊天数据
exports.showMessage = function(req,res,from,to){
    var search={
        $or : [ //多条件，数组
            {'fromUserID': from,'toUserID':to},
            {'fromUserID': to,'toUserID':from}
        ]
    };
    //var search = {'fromUserID': from,'toUserID': to};
    var out = {};
    message.find(search, out, function(err, rest){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var context = {
                vacation : rest.map(function(ver){
                    if(ver.status==0 && ver.toUserID==to){
                        messagedb.read(from,to);
                    }
                    return {
                        message: ver.postMessages,
                        status : ver.status,
                        fromUserID : ver.fromUserID,
                        toUserID: ver.toUserID,          
                        dateTime: ver.dateTime,    
                    }
                })
            };
            //console.log(context);
            res.send({success:true,context});
        }
    });

};