import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
const loaderHoc = (ChildComponent) => {
  class HOComponent extends Component {
    
    componentDidMount() {
      console.log("Inside lader hoc", this.props)
    }

    render() {
      const { data = {}, isFetching, error } = {}; 
      if (isFetching) {
        return (
          <div>Loading</div>
        );
      }

      if (error) {
        return (
          <div>Something is wrong. Please try again!</div>
        );
      }

      if (isEmpty(data)) {
        return (
          <div>No Data!</div>
        );
      }

      return (
        <ChildComponent
          {...this.props}
        />
      );
    }
  }

  const mapStateToProps = state => {
    return state;
  };

  HOComponent.displayName = `loaderHoc(${getDisplayName(HOComponent)})`;

  return connect(
    mapStateToProps
  )(HOComponent);
};
export default loaderHoc;