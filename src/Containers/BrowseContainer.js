import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Browse from '../Components/Browse/Browse';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state) => {
  return {
    isDarkTheme: state.theme.isDarkTheme,
    featured:{
      title: state.featuredEvents.title,
      data: state.featuredEvents.data,
    },
    all: {
      title: state.allEvents.title,
      data: state.allEvents.data,
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const BrowseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse)

export default BrowseContainer;
