import Login from '../component/Login';
import '../css/login.css';
import {startLogin,finishLogin,failLogin,loginSuccess,loginFail} from '../reducer/user';
import {showFlashMessage,removeFlashMessage } from '../reducer/flashMessage';
import redirect from '../hight-order-component/redirect';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {login} from '../service/fetch'

const mapStateToProps = (state)=>(
	state.login
)

const mapDispatchToProps = (dispatch)=>{
	return {
		loginIn:(user=>{
			login(user)
			.then(result=>{
				if(result.code == 1){
					dispatch(finishLogin(result.user));
					dispatch(showFlashMessage(loginSuccess()))
			}else{
				dispatch(failLogin(result.message))
				dispatch(showFlashMessage(loginFail(result.message)))
			}
			})
		})
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(redirect(Login)));
