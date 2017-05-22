import { connect } from 'react-redux';
import _ from 'lodash';
import GraphComponent from '../components/Graph';

const mapStateToProps = (state, ownProps) => (
  {
    data: state.data,
    graphInfo: state.graph,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    mouseOverFunc: (value, data) => {
      dispatch({ type: 'HOVER_NODE', value, data })
    },
    mouseOutFunc: (value, data) => {
      dispatch({ type: 'UNHOVER_NODE' })
    },
    clickFunc: (value, links) => {
      dispatch({ type: 'CLICK_NODE', value, links })
    },
    toggleLinkedNodes: (value, links) => {
      dispatch({ type: 'TOGGLE_VIEW', value: value === 'network' ? true : false, links })
    },
  }
);

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { graph, pointRange } = stateProps.data;
  return Object.assign({}, {
    graph,
    pointRange,
    ...stateProps.graphInfo,
    mouseOverFunc: (d) => {
      return dispatchProps.mouseOverFunc(d, graph);
    },
    mouseOutFunc: () => {
      return dispatchProps.mouseOutFunc();
    },
    clickFunc: (d) => {
      return dispatchProps.clickFunc(d, graph.links);
    },
    toggleLinkedNodes: (e) => {
      return dispatchProps.toggleLinkedNodes(e.currentTarget.value, graph.links);
    },
  })
};


export default connect(mapStateToProps,
  mapDispatchToProps,
  mergeProps)(GraphComponent);