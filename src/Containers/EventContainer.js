import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import Event from '../Components/Event/Event';

const mapStateToProps = (state, ownProps) => {
  return {
    eventId: ownProps.match.params.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event)

export default EventContainer;
