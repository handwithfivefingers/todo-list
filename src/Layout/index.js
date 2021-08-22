import { Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';
import ContentLayout from '../components/Layout/Content';
import SiderLayout from '../components/Layout/Sidebar';

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  }
  else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
}

class LayoutRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default: null,
    };
  }
  render() {
    const { component: YoursComponent, authReducer, name, ...remainProps } = this.props;
    const token = getCookie('token');
    if (token !== null && token !== undefined) {
      return (
        <Route
          {...remainProps}
          render={(routeProps) => {
            return (
              <>
                <SiderLayout {...routeProps} />
                <ContentLayout  {...routeProps}>
                  <Spin spinning={authReducer.authenticating}>
                    <YoursComponent {...routeProps} />
                  </Spin>
                </ContentLayout>
              </>
            );
          }}
        />
      )
    } else {
      switch (name) {
        case "Project":
          return (
            <Redirect to="/login" />
          )
        case "Profile":
          return (
            <Redirect to="/login" />
          )
        case "Taskboard":
          return (
            <Redirect to="/login" />
          )
        default:
          return (
            <Route
              {...remainProps}
              render={(routeProps) => {
                return (
                  <>
                    <SiderLayout {...routeProps} />
                    <ContentLayout  {...routeProps}>
                      <Spin spinning={authReducer.authenticating}>
                        <YoursComponent {...routeProps} />
                      </Spin>
                    </ContentLayout>
                  </>
                );
              }}
            />
          )
      }
    }
  }
}
const mapStatetoProps = state => ({
  authReducer: state.authReducer
})
const mapDispatchtoProps = null;
const withConenct = connect(mapStatetoProps, mapDispatchtoProps)
export default compose(withConenct)(LayoutRoute);
