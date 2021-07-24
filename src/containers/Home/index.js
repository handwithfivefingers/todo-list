import React, { Component } from 'react';
import { Progress, Row, Col } from 'antd';
import { SearchOutlined, FilePdfFilled } from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';

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
    const { taskReducer } = this.props;

    return (
      <Row gutter={[16, 24]}>
        <Col span={6}>
          {taskReducer.project?.map((item) => {
            return (
              <div className="todo-card-ui" key={item._id}>
                <div className="body">
                  <div className="avatar">
                    <Progress
                      type="circle"
                      percent={item.progress}
                      width={80}
                      status={item.type}
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
              <label>
                <SearchOutlined />
              </label>
              <input type="search" />
            </div>
            <div className="main-content">
              <div className="project-about">
                <h1 className="project-title">Project Name</h1>
                <p className="project-desc"> Description </p>
              </div>
              <div className="project-timeline">
                <div className="item">
                  Title : <span> ......... </span>
                </div>
              </div>
              <div className="project-timeline">
                <div className="item">
                  Title : <span> ......... </span>
                </div>
              </div>
              <div className="project-timeline">
                <div className="item">
                  Title : <span> ......... </span>
                </div>
              </div>
            </div>
            <div className="footer-content">
              <div className="footer-item">
                <FilePdfFilled />
                Photoshop
              </div>
              <div className="footer-item">Illustrator</div>
              <div className="footer-item">Sketchup</div>
              <div className="footer-item">Blender</div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
const mapStatetoProps = (state) => ({
  taskReducer: state.taskReducer,
});
const mapDispatchtoProps = null;
const withConnect = connect(mapStatetoProps, mapDispatchtoProps);
export default compose(withConnect)(Home);
