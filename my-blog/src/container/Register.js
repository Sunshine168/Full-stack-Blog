import Register from "../component/Register";
import redirect from "../hight-order-component/redirect";
import { connect } from "react-redux";
import { showFlashMessage } from "../reducer/flashMessage";
import { register } from "../service/fetch";

const mapDispatchToProps = dispatch => {
  return {
    register:formData => {
			return register(formData).then( (result,sucCb) => {
				if (result.code === 1) {
					dispatch(showFlashMessage({
						msg: "注册成功",
						msgType: "success"
					}));
					sucCb()
				} else {
					this.props.showFlashMessage({
						msg: "注册失败",
						msgType: "danger"
					});
				}
			});
		}
  };
};

export default connect(null, mapDispatchToProps)(redirect(Register));
