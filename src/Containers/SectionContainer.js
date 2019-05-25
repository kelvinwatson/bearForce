import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Section from '../Components/Section/Section';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    sectionTitle: ownProps.title,
    darkTitleClassName: ownProps.darkTitleClassName,
    data: ownProps.data,
    isDarkTheme: state.theme.isDarkTheme,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (evt) => {
      DebugLog('onItemClick',evt);
    }
  }
}

const SectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Section)

export default SectionContainer;
