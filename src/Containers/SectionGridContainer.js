import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import SectionGrid from '../Components/SectionGrid/SectionGrid';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    isDarkTheme: state.theme.isDarkTheme,
    data: ownProps.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const SectionGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionGrid)

export default SectionGridContainer;
