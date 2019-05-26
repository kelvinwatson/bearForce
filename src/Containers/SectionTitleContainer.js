import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import SectionTitle from '../Components/SectionTitle/SectionTitle';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    title: ownProps.title,
    darkTitleClassName: ownProps.darkTitleClassName,
    isDarkTheme: state.theme.isDarkTheme,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const SectionTitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionTitle)

export default SectionTitleContainer;
