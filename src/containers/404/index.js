import { Button, Result } from 'antd';
import React, { Component } from 'react';

class NotFound extends Component {

  goback = () => {
    console.log('goback');
    let {history} = this.props;
    history.push('/');
  }
  render() {
    return (
      <>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary" onClick={this.goback}>Back Home</Button>}
        />
        ,
      </>
    );
  }
}

export default NotFound;
