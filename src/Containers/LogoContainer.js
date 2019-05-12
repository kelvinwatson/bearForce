import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Logo from '../Components/Logo/Logo';

const mapStateToProps = (state) => {

  return {
    isDarkTheme: state.theme.isDarkTheme,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const LogoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logo)

export default LogoContainer;
