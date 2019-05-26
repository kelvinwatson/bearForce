import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import Header from '../Components/Header/Header';

const mapStateToProps = (state) => {

  return {
    isDarkTheme: state.theme.isDarkTheme,
  }
}

const mapDispatchToProps = (dispatch) => {

  return {

  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer;
