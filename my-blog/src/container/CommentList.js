import {connect} from 'react-redux';
import CommentList from '../component/CommentList';
import {showFlashMessage} from '../reducer/flashMessage';
import {deleteComment} from '../reducer/comment';
import { withRouter } from 'react-router-dom';
const mapStateToProps=(state)=>(state.comment)

const mapDispatchToProps = (dispath)=>{
  return {
    showFlashMessage:(message)=>{
      dispath(showFlashMessage(message))
    },
    deleteComment:(index)=>{
      dispath(deleteComment(index))
    }
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CommentList))
