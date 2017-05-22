import { connect } from 'react-redux';
import _ from 'lodash';
import AppComponent from '../components/App'

const mapStateToProps = (state, ownProps) => (
  {
    currentView: state.currentView
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    init: () => {
      dispatch({ type: 'INITIALIZE' });
      dispatch({ type: 'SET_GENDER', value: 'men' });
    }
  }
)
export default connect(mapStateToProps,
  mapDispatchToProps,
)(AppComponent)