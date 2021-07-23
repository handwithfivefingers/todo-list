import React, { Component } from 'react';
import { Progress, Row, Col } from 'antd';
const SideTask = [
  {
    id: 1,
    name: 'Project 1',
    desc: 'Something ....',
    progress: 50,
    status: 'active',
  },
  {
    id: 2,
    name: 'Project 2',
    desc: 'Something ....',
    progress: 30,
    status: 'exception',
  },
  {
    id: 3,
    name: 'Project 3',
    desc: 'Something ....',
    progress: 80,
    status: 'active',
  },
  {
    id: 4,
    name: 'Project 4',
    desc: 'Something ....',
    progress: 100,
    status: 'success',
  },
];
class Home extends Component {
  render() {
    return (
      <Row gutter={[16, 24]}>
        <Col span={6}>
          {SideTask.map((item) => {
            return (
              <div className="todo-card-ui" key={item.id}>
                <div className="body">
                  <div className="avatar">
                    <Progress
                      type="circle"
                      percent={item.progress}
                      width={80}
                      status={item.status}
                    />
                  </div>
                  <div className="content">
                    <h3>Item: {item.name}</h3>
                    <p>Desc: {item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Col>
        <Col span={18}>
          <div className="home-content">
            <div className="search">
              <label>Search</label>
              <input type="search" />
            </div>
            <div className="main-content">main content</div>
            <div className="footer-content">footer content</div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Home;
