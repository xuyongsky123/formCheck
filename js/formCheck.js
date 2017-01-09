//校验input表单输入框是否为空
;(function($){
	//内部定义参数（不外抛）
	var paramsInner = {
		errStatus:{
			tipNull:0,
			tipErr:1
		},
		errMsg:{
			require:'不能为空（非空错误）',
			regErr:'格式不正确（校验错误）'
		},
		//判断某对象是否有某个属性
		hasPrototype:function(obj,name){
			return obj.hasOwnProperty(name);
		}
	}
	//内部默认定义参数（外抛）
	var defaults = {
		errMsg:{
			id:{
				require:'不能为空/必选（非空错误）',
				regErr:'格式不正确（校验错误）'
			}
		}
	};



	$.fn.formCheck = function(options,successCallBack,callback){
		var params = $.extend(defaults,options);

		var form = this.get(0);
		var $form = this;
		var flag = false;	//记录校验状态

		$form.find('input,textarea,select').each(function(){
			var $input =$(this);
			var input = this;
			var _tmp = $.trim($input.val());

			if(this.tagName.toUpperCase() == 'SELECT'){
				var _tmpValue = $.trim($input.find('option:selected').attr('value'));

				if($input.attr('require')){
					if( _tmp == '' || _tmp == null ){
						if(input.hasAttribute('id')){
							if(paramsInner.hasPrototype(params.errMsg,$input.attr('id'))){
								callback( paramsInner.errStatus.tipNull , params.errMsg[$input.attr('id')].require , $input.attr('id') , form );
							}else{
								//外部未定义错误描述使用默认错误描述
								callback(paramsInner.errStatus.tipNull , paramsInner.errMsg.require , $input.attr('id') , form );
							}
							
						}else{
							//外部未定义错误描述使用默认错误描述
							callback( paramsInner.errStatus.tipNull , paramsInner.errMsg.require , $input.attr('id') , form );
						}

						$input.addClass('inputErr');					
						flag = false;
						return false;
					}else{
						$input.removeClass('inputErr');					
						flag = true;
					}
				}
			}

			if($input.attr('require')){
				if( _tmp == '' || _tmp == null ){
					if(input.hasAttribute('id')){
						if(paramsInner.hasPrototype(params.errMsg,$input.attr('id'))){
							callback( paramsInner.errStatus.tipNull , params.errMsg[$input.attr('id')].require , $input.attr('id') , form );
						}else{
							//外部未定义错误描述使用默认错误描述
							callback(paramsInner.errStatus.tipNull , paramsInner.errMsg.require , $input.attr('id') , form );
						}
						
					}else{
						//外部未定义错误描述使用默认错误描述
						callback( paramsInner.errStatus.tipNull , paramsInner.errMsg.require , $input.attr('id') , form );
					}

					$input.addClass('inputErr');					
					flag = false;
					return false;
				}else{
					$input.removeClass('inputErr');					
					flag = true;
				}
			}
			
			if(typeof $input.attr('xy-pattern') != 'undefined'){
				var pattern = $input.attr('xy-pattern');
				if(!eval(pattern).test(_tmp)){

					if(input.hasAttribute('id')){
						if(paramsInner.hasPrototype(params.errMsg,$input.attr('id'))){
							callback( paramsInner.errStatus.tipErr , params.errMsg[$input.attr('id')].regErr , $input.attr('id') , form );
						}else{
							//外部未定义错误描述使用默认错误描述
							callback( paramsInner.errStatus.tipErr , paramsInner.errMsg.regErr , $input.attr('id') , form );
						}
					}else{
						//外部未定义错误描述使用默认错误描述
						callback( paramsInner.errStatus.tipErr , paramsInner.errMsg.regErr , $input.attr('id') , form );
					}

					$input.addClass('inputErr');
					flag = false;
					return false;
				}else{
					$input.removeClass('inputErr');
					flag = true;
				}
			}

		});

		if(flag){
			successCallBack(flag,form);
		}


		//错误提示样式消除
		$form.find('input , textarea').on('focus',function(){
			$(this).removeClass('inputErr');
		});
		$form.find('select').on('change',function(){
			$(this).removeClass('inputErr');
		});

		return flag;

	}

})(jQuery);
