import React, { Component } from 'react';
import { Progress, Row, Col, Tooltip, Avatar } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined  } from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PS from './../../assets/img/PS.png';
import AI from './../../assets/img/AI.png';
import Blender from './../../assets/img/Blender.png';
import VS from './../../assets/img/VS.png';
const UserJoin = [
  {
    id: 1,
    name: 'James',
    desc: 'Something ....',
    status: true,
  },
  {
    id: 2,
    name: 'Simon',
    desc: 'Something ....',
    status: false,
  },
  {
    id: 3,
    name: 'David',
    desc: 'Something ....',
    status: false,
  },
  {
    id: 4,
    name: 'Angela',
    desc: 'Something ....',
    status: true,
  },
];
class Home extends Component {
  state = {
    project: null,
  };

  applyTask(item) {
    this.setState({
      project: item,
    });
    console.log(this.state);
  }
  componentDidUpdate(prevProps) {
    const { taskReducer } = this.props;
    if (prevProps.taskReducer.project !== taskReducer.project) {
      this.applyTask(taskReducer.project[0]);
    }
  }
  render() {
    console.log(this.state);
    const { taskReducer } = this.props;
    const { project } = this.state;
    return (
      <Row gutter={[16, 24]}>
        <Col xs={24} sm={24} md={8} lg={6} xl={6}>
          {taskReducer.project?.map((item) => {
            return (
              <div
                className="todo-card-ui"
                key={item._id}
                onClick={() => this.applyTask(item)}
              >
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
        <Col xs={24} sm={24} md={16} lg={18} xl={18}>
          <div className="home-content">
            <div className="search">
              <label>
                <SearchOutlined />
              </label>
              <input type="search" />
            </div>
            <div className="main-content">
              <div className="todo-left-dashboard">
                <div className="project-about">
                  <h1 className="project-title">
                    Project Name: {project ? project.name : ''}
                  </h1>
                  <ul
                    className="project-desc"
                    style={{ listStyleType: 'none' }}
                  >
                    <li>Description: {project ? project.desc : ''}</li>
                    <li>
                      Id: <span>{project ? project._id : ''} </span>
                    </li>
                    <li>
                      Status: <span>{project ? project.type : ''} </span>
                    </li>
                  </ul>
                </div>
                <div className="project-timeline">
                  <h1> Progress</h1>
                  <div className="item">
                    <span>
                      <Tooltip
                        title={`Done: ${
                          project ? project.progress / 2 : ''
                        }% / To do: ${
                          project ? project.progress / 2 : ''
                        }% / In Progress: ${
                          project ? 100 - project.progress : ''
                        }% `}
                      >
                        <Progress
                          percent={project ? project.progress : ''}
                          success={{
                            percent: project ? project.progress / 2 : '',
                          }}
                          type="dashboard"
                        />
                      </Tooltip>
                    </span>
                    <span>
                      <Progress percent={30} />
                      <Progress percent={50} status="active" />
                      <Progress percent={70} status="exception" />
                      <Progress percent={100} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="todo-right-dashboard">
                <h1>User Join </h1>
                <div className="todo-user">
                  {UserJoin.map((user) => {
                    return (
                      <div className="project-user">
                        <div className="avatar">
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </div>
                        <div className="content">
                          <ul style={{ listStyleType: 'none' }}>
                            <li>Name: {user.name}</li>
                            <li>Status: {user.status ? <CheckOutlined  style={{color:'#52c41a'}}/> : <CloseOutlined />}</li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Row>
              <div className="footer-content">
                <div className="footer-item">
                  <img src={PS} />
                </div>
                <div className="footer-item">
                  <img src={AI} />
                </div>
                <div className="footer-item">
                  <img src={Blender} />
                </div>
                <div className="footer-item">
                  <img src={VS} />
                </div>
              </div>
            </Row>
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
