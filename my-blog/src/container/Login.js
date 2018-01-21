import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';

import Login from '../component/Login';
import '../css/login.css';
import {startLogin,finishLogin,failLogin,loginSuccess,loginFail} from '../reducer/user';
import {showFlashMessage,removeFlashMessage } from '../reducer/flashMessage';
import redirect from '../hight-order-component/redirect';
import {login} from '../service/fetch'

const mapStateToProps = (state)=>(
	state.login
)

const mapDispatchToProps = (dispatch)=>{
	return {
		loginIn:(user=>{
			login(user)
			.then(res=>{
				const {data} = res
				  if(data){
						dispatch(finishLogin(data.user));
						toast.success('登录成功',{
							position:toast.POSITION.TOP_RIGHT,
						})
					}
			})
		})
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(redirect(Login)));
