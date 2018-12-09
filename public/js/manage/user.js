;(function($,window){

    var training = {
        init : function(){
            this._userRegist();
            this._userTable();
            this._length = 0;
            this.heightArr = [];
            var _this = this;

        },
       
        // 用户数据
        _userRegist : function(){
        	var $count =$('.count');
        	var html = '';
        	$.ajax({
				url: '/yike/manage/user/userRegist',
				type: 'POST',
				data: '',
				success: function(data){
					if(data.success){
						var aa = data.context;
						$count.html(aa.i);
						aa.vacation.map(function(ver){
							if(ver){
								html +='<li><span>'+ver.j+'</span><i style="height:'+ver.j*2+'px"></i><span class="inst-date">'+ver.d+'</span></li>';
							}
						})
						$('.detial-count ul').html(html);
						//console.log(aa);						
					}
					else{
					console.log('返回数据失败');
					}
				},
				error: function(){
					console.log('出现问题');
				}
			});
        },

 		// 群数据
        _userTable : function(){
        	var html = '';
        	$.ajax({
				url: '/yike/manage/user/userTable',
				type: 'POST',
				data: '',
				success: function(data){
					if(data.success){
						var aa = data.context.vacation;
						//console.log(aa);
						aa.map(function(ver){
						html += '<tr><td><i></i><span>'+ver.d+'</span></td>'+
						'<td><img src="/vacation-photo/'+ver.imgurl+'"></td>'+
						'<td>'+ver.name+'</td>'+
						'<td>'+ver.email+'</td>'+
						'<td>'+ver.sex+'</td>'+
						'<td>'+ver.birth+'</td>'+
						'<td>'+ver.registerdate+'</td>'+
						'<td>'+ver.online+'</td>';
						if(ver.admin){
							html +='<td></td>';
						}else{
							html +='<td><span class="td-sixin">私信</span><span class="td-delete">删除</span></td>';
						}
						html +='</tr>';
						})
						$('.user-table table').append(html);
					}
					else{
					console.log('返回数据失败');
					}
				},
				error: function(){
					console.log('出现问题');
				}
			});
        },

    }
    $(document).ready(function(){
        training.init();
        // $('.training-iframe').teoyallScroll();
    })

    window.training = training;

}(jQuery,window));