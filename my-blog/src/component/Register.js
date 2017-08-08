import React, {
	Component
} from 'react';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button,Modal} from 'react-bootstrap';
import {DOMAIN,register,checkAccount} from "../service/fetch";
import PropTypes from 'prop-types'
export default class RegisterInput extends Component {
	static propTypes=({
		showFlashMessage:PropTypes.func,
		redirect:PropTypes.func,
	})
     constructor(props){
			 super(props);
    let data = new FormData();
			 this.state = {
				 account:"",
				 password:"",
         nickName:"",
				 confirmPassword:"",
				 gender:"0",
				 bio:"",
				 accountVaild:null,
				 pwdValid:null,
				 cpwdValid:null,
				 unValid:null,
				 accountHelp:"",
				 pwdHelp:"",
				 cpwdHelp:"",
				 unHelp:"",
				 formData:data,

			 }
			//  this._closeModal.bind(this);
			//  this._handleAccount.bind(this);
		 }
		 render(){
			    return<div className="content_wrap">
						<form>
							<FieldGroup
								id="formControlsEmail"
								type="text"
								label= "account"
								placeholder="Enter account"
								ref={(input)=>this.email=input}
								onChange={(event)=>this.setState({account:event.target.value})}
								onBlur={(event)=>this._checkAccount(event.target.value)}
								validationState={this.state.accountVaild}
								help={this.state.accountHelp}
							/>
							<FieldGroup
								id="formControlsPassword"
								label="Password"
								type="password"
								placeholder="Enter Password"
								onChange={(event)=>this.setState({password:event.target.value})}
								onBlur={(event)=>this._checkPassword(event.target.value)}
								validationState={this.state.pwdValid}
								help={this.state.pwdHelp}
							/>
              <FieldGroup
                id="formControlsPassword"
                label="confirmPassword"
                type="password"
                placeholder="Enter confirm Password"
                onChange={(event)=>this.setState({confirmPassword:event.target.value})}
								onBlur={(event)=>this._checkConfirmPassword(event.target.value)}
								validationState={this.state.cpwdValid}
								help={this.state.cpwdHelp}
              />
							<FieldGroup
								id="formControlsPassword"
								label="username"
								type="text"
								placeholder="Enter username"
								onChange={(event)=>this.setState({username:event.target.value})}
								onBlur={(event)=>this._checkUsername(event.target.value)}
								validationState={this.state.unValid}
								help={this.state.unHelp}
							/>
              <FormGroup>
                <ControlLabel>性别</ControlLabel>
                <FormControl componentClass="select" placeholder="性别"
                  onChange={(event)=>this.setState({gender:event.target.value})}>
                  <option value="0">男</option>
                  <option value="1">女</option>
                </FormControl>
              </FormGroup>
							<FormGroup controlId="avaterUpload">
								<ControlLabel>上传头像</ControlLabel>
								<Button
									bsStyle="primary"
									onClick={()=>this.setState({
										showModal:true
									})}
								>
								点击上传</Button>
							</FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Textarea</ControlLabel>
                <FormControl componentClass="textarea" placeholder="个人签名"
                  onChange={(event)=>this.setState({bio:event.target.value})}/>
              </FormGroup>
							<Button bsStyle="primary" bsSize="large" block onClick={()=>this._register()}>signUp</Button>
						</form>
						<Modal show={this.state.showModal} onHide={()=>this._closeModal()}>
							<Modal.Header closeButton>
								<Modal.Title>上传头像</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<h4></h4>
								<FieldGroup
									id="upload"
									type="file"
									label="File"
									onChange={(event)=>this._change(event.target.value)}
								/>
								<img src="" alt="" className="previewAvater" id="preview"/>
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={()=>this._confirmAvater()}>确定</Button>
								<Button onClick={()=>this._closeModal()}>取消</Button>
							</Modal.Footer>
						</Modal>
					</div>
		 }
		 /*
     检验账号需要网络请求
		  */
     async _checkAccount(value){
			 /*重设一次*/
			 this.setState({
				 accountVaild:null,
				 accountHelp:"",
			 })
			 if(value.length<6){
				 this.setState({
					 accountVaild:"error",
					 accountHelp:"账号长度需要大于6位"
				 })
			 }else{
				 //网络请求检验账号是否已用
				 let result =await checkAccount(value);
				 if(result.code==1){
					 this.setState({
					 accountVaild:"success",
					 accountHelp:"账号可用"
				 })
			 }else{
				 this.setState({
				 accountVaild:"error",
				 accountHelp:"账号已被使用"
			 })
			 }

			 }
		 }
		 /*检验密码*/
		_checkPassword(value){
			 this.setState({
				pwdValid:null,
				pwdHelp:"",
			})
			 if(value.length<8){
				 this.setState({
					pwdValid:"error",
					pwdHelp:"密码必须大于8位",
				})
			 }else{
				 //网络请求检验账号是否已用
				 this.setState({
					 pwdValid:"success",
				})
			 }
		 }
		 /*检验确认密码*/
		_checkConfirmPassword(value){
			this.setState({
			 cpwdValid:null,
			 cpwdHelp:"",
		 })
			if((this.state.password!=this.state.confirmPassword)||this.state.confirmPassword==""){
				this.setState({
				 cpwdValid:"error",
				 cpwdHelp:"两次密码必须一样",
			 })
			}else{

				this.setState({
					cpwdValid:"success",
			 })
			}
		}
		/*检验用户账号*/
		_checkUsername(value){
			this.setState({
			 unValid:null,
			 unHelp:"",
		 })
			if(value.length==0){
				this.setState({
				 unValid:"error",
				 unHelp:"用户名不能为空",
			 })
			}else{

				this.setState({
					unValid:"success",
			 })
			}
		}
		_closeModal(){
			this.setState({
				showModal:false
			})
		}
		 async _register(){
			   //检查数据有效性
			   let {account,username,password,gender,bio, accountVaild,pwdValid,cpwdValid,unValid} = this.state,valid = false;
         if(accountVaild=="success"&&pwdValid=="success"&&cpwdValid=="success"&&unValid=="success"){valid = true}
         if(valid){
					 let formData= this.state.formData;
					 formData.append("account",account);
					 formData.append("username",username);
					 formData.append("password",password);
					 formData.append("gender",gender);
					 formData.append("bio",bio);
					 let result = await register(formData);
					 console.log(result)
				 if(result.code==1){
					this.props.showFlashMessage({
						msg:"注册成功",
						msgType:"success",
					})
					let pathname ='/login',
					redirectState = { from: this.props.location };
					this.props.redirect(pathname,redirectState)
				}else{
					this.props.showFlashMessage({
					 msg:"注册失败",
					 msgType:"danger",
				 })
				}
				 }
		 }
		 /*
    参考自
		 http://www.cnblogs.com/tugenhua0707/p/3568134.html
		  */
		_change() {
			/*直接操作原生dom对象*/
      let pic = document.getElementById("preview"),
			   file = document.getElementById("upload");

      let valid =/(.jpg|.png|.gif|.jpeg)$/.test(file.value);

     // gif在IE浏览器暂时无法显示
     if(!valid){
         alert("图片的格式必须为png或者jpg或者jpeg格式！");
         return;
     }
    this._html5Reader(file);
}

    _html5Reader(file){
			console.log(file)
			 var file = file.files[0];
     var reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function(e){
         var pic = document.getElementById("preview");
         pic.src=this.result;
     }
 }
  _confirmAvater(){
    /*直接操作原生dom对象*/
		let picSrc = document.getElementById("preview").src;
		if(picSrc==""){
			  alert("图片不能为空！");
		}else{
			let formData= this.state.formData;
			formData.append('pic',picSrc)
		}
		//关闭Modal
		this._closeModal()
	}
}
/*生成表单元素*/
function FieldGroup({ id, label, help,validationState, ...props }) {
  return (
    <FormGroup controlId={id}
			validationState={validationState}
		>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
