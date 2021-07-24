import {
  EditOutlined,
  LoginOutlined, PlusSquareOutlined, RestOutlined
} from '@ant-design/icons';
import { Button, Col, Popover, Progress, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { ModalAction, TaskAction } from '../../actions';
class Project extends Component {
  constructor(props) {
    super(props);
    this.hoverRef = React.createRef();
    this.showform = this.showform.bind(this);
  }
  state = {
    search: '',
    x: 0,
    y: 0,
  };
  showform() {
    console.log('bind func');
    const { ModalListAction } = this.props;
    const { ShowModal } = ModalListAction;
    ShowModal({ title: `Add New Project` });
  }
  render() {
    const { taskReducer } = this.props;

    return (
      <>
        <Row>
          <Col>
            <Popover content="Sorry this api doesnt complete" trigger="hover">
              <Button type="primary" onClick={this.showform} disabled>
                <PlusSquareOutlined /> New Project
              </Button>
            </Popover>
          </Col>
        </Row>
        <Row gutter={[24, 16]}>
          {taskReducer.project
            ? taskReducer.project.map((item) => {
                return (
                  <Col span={6} key={item._id} className="gutter-row">
                    <div className="todo-card-ui">
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
                          <ul
                            style={{
                              listStyleType: 'none',
                              textAlign: 'left',
                              // padding: '5px 0 0 8px',
                              margin: 0,
                            }}
                          >
                            <li>Desc: {item.desc}</li>
                            <li>Status: {item.type}</li>
                            <li>Created: {item.createdAt.substring(0, 10)}</li>
                            <li>Updated: {item.updatedAt.substring(0, 10)}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="footer">
                        <div className="action-button" style={{ padding: 0 }}>
                          <Popover content="Manager Task" trigger="hover">
                            <Link
                              key={item._id}
                              to={{
                                pathname: `/project/${item.slug}`,
                                state: { projectId: item._id },
                              }}
                              style={{
                                width: '100%',
                                borderRight: '1px solid #eee',
                                color: 'inherit',
                              }}
                            >
                              <LoginOutlined />
                            </Link>
                          </Popover>
                          <Popover content="Edit" trigger="hover">
                            <EditOutlined />
                          </Popover>
                          <Popover content="Delete Task" trigger="hover">
                            <RestOutlined
                              key="restout"
                              onClick={() => console.log(`del`)}
                            />
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            : ''}
        </Row>
      </>
    );
  }
}

const mapStatetoProps = (state) => ({
  taskReducer: state.taskReducer,
});
const mapDispatchToProps = (dispatch) => ({
  TaskListAction: bindActionCreators(TaskAction, dispatch),
  ModalListAction: bindActionCreators(ModalAction, dispatch),
});
const withConnect = connect(mapStatetoProps, mapDispatchToProps);
export default compose(withConnect)(Project);
