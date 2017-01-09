<h2>formCheck简介<a href="demo.html">表单简单校验formCheck使用示例</a></h2>
<p>基于jQuery插件开发的自定义插件-简单校验表单提交，包含input\textarea\select表单元素，只需在html标签元素上添加如下需要校验的内容：<br/>
<strong>require="true"	//必填项（要求不能为空或不选）</strong><br/>
<strong>xy-pattern="正则表达式"	//有则校验（校验当前表单元素输入格式是否合乎要求），没有则忽略</strong>
</p>

<hr/>

<h3>1、开始工作：</h3>
<p>
  需要最先引入jquery (Bootstrap中文网开源项目免费 CDN 服务)：
</p>
```html
<script type="text/javascript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
```
<p>
  我们需要在页面中引入关键js：
</p>
```html
<script type="text/javascript" src="....../storage.js"></script>
```

<h3>2、简单校验内容：</h3>
<p>
  input（必填项）（正则） <br/>
  textarea（必填项）（正则） <br/>
  select（必选项）
</p>

<h3>3、通过js调用：</h3>
<h4>html：</h4>
<p>
  （为了使格式校验生效，我们采用html标签属性来作为校验标准要求，如下：‘require="true"、xy-pattern="正则表达式"’）
</p>
```html
<form id="form1">
	<input id="test1" type="text" require="true" xy-pattern="/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/" placeholder="请输入手机号码" />
    ......
</form>
```

<h4>css（添加在当前错误表单元素上的错误提示样式class）：</h4>
```css
.inputErr {
border-color: red !important;
}
```

<h4>js：</h4>
```javascript
var a = $('#form1').formCheck({		//此处变量a为整体表单校验的成败与否
errMsg:{
    test1:{		//test1为当前需要校验的表单元素id
      require:'手机号码不能为空',		//必填项未填错误提示
      regErr:'手机号码格式不正确'	//必填项输入格式错误提示
    }
}
},function(submitFlag,formEle){
  //成功回调

  console.log('校验结果'+submitFlag);	//检验结果正确（可忽略，本身返回即为成功）
  console.log('提交表单'+formEle)		//当前表单

},function(status,errMsg,formEle){
  //校验表单有错回调

    console.log(status);	//错误状态：0表示必填未填错误、1表示填写格式校验错误
    console.log(errMsg);	//错误文字描述
    console.log(domId);	//当前不符合校验元素的id
    console.log(formEle);	//当前表单
});
```

<h3>4、兼容性：</h3>
<p>
  兼容IE8及以上浏览器
</p>
