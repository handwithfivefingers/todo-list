import { Button, Result } from 'antd';
import React, { Component } from 'react';

class NotFound extends Component {

  goback = () => {
    let {history} = this.props;
    history.push('/');
  }
  render() {
    return (
      <>
        <Result
          status="404"
          title="404"
          subTitle="Trang bạn tìm không tồn tại"
          extra={<Button type="primary" onClick={this.goback}>Quay lại</Button>}
        />
        ,
      </>
    );
  }
}

export default NotFound;
