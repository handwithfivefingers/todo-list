import {
  EditOutlined,
  LoginOutlined, PlusSquareOutlined, RestOutlined
} from '@ant-design/icons';
import { Button, Col, Popover, Progress, Row, Spin, Popconfirm, Card, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { ModalAction, TaskAction, ProjectAction } from '../../actions';
import ModalForm from '../../components/Layout/UI/Modal/ModalForm';

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
  componentDidMount() {
    const { TaskListAction } = this.props;
    const { fetchListTask } = TaskListAction;
    if (this.props.authReducer.user) {
      const id = this.props.authReducer.user._id;
      if (id !== null && id !== undefined && id !== "") {
        fetchListTask(id);
      }
    }
  }
  componentDidUpdate(prevProps) {
    const { TaskListAction } = this.props;
    const { fetchListTask } = TaskListAction;
    if (prevProps.authReducer.user !== this.props.authReducer.user) {
      const id = this.props.authReducer.user._id;
      if (id !== null && id !== undefined && id !== "") {
        fetchListTask(id);
      }
    }
  }
  showform() {
    console.log('bind func');
    const { ModalListAction } = this.props;
    const { ShowModal } = ModalListAction;
    ShowModal({ title: `Add New Project` });
  }
  EditProject = (item) => {
    const { ProjectListAction } = this.props;
    const { projectEditting } = ProjectListAction;
    const { ModalListAction } = this.props;
    const { ShowModal } = ModalListAction;
    ShowModal({ title: `Update Project` });
    projectEditting(item);
  }
  deleteProject = (item) => {
    const { ProjectListAction } = this.props;
    const { projectDelete } = ProjectListAction;
    projectDelete(item);
    message.success('Đã xóa Project');
  }
  render() {
    const { taskReducer, authReducer } = this.props;

    return (
      <>
        <Row>
          <Col>
            <Popover content="Add new project" trigger="hover">
              <Button type="primary" onClick={this.showform}>
                <PlusSquareOutlined /> New Project
              </Button>
            </Popover>
          </Col>
        </Row>
        <Spin spinning={taskReducer.loading}>
          <Row gutter={8}>
            {taskReducer.project
              ? taskReducer.project.map((item) => {
                return (
                  <Col xs={24} sm={12} md={12} lg={8} xl={6} key={item._id} className="gutter-row">
                    <Card
                      style={{ width: 'auto', marginTop: 16 }}
                      bodyStyle={{ padding: 10 }}
                      actions={[
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
                        </Popover>,
                        <Popover content="Edit" trigger="hover">
                          <EditOutlined onClick={() => this.EditProject(item)} />
                        </Popover>,
                        <Popover content="Delete Task" trigger="hover">
                          <Popconfirm
                            title="Bạn có chắc muốn xóa task này ?"
                            onConfirm={(e) => this.deleteProject(item)}
                            // onCancel={cancel}
                            okText="Xóa"
                            cancelText="Không"
                          >
                            <RestOutlined key="restout" />
                          </Popconfirm>
                        </Popover>
                      ]}
                    >
                      <Card.Meta
                        avatar={
                          <Progress
                            type="circle"
                            percent={item.progress}
                            width={80}
                            status={item.status}
                          />
                        }
                        style={{ padding: 5 }}
                        title={`${item.name}`}
                        description={
                          <ul><li>
                            Created: {item.createdAt.substring(0, 10)}
                          </li>
                            <li> Author: {authReducer.user.fullName}</li>
                          </ul>
                        }
                      />
                      <Card type="inner" bordered={false} bodyStyle={{ padding: 0 }}>
                        <Card.Meta
                          style={{ display: 'flex', width: '100%', padding: 5, justifyContent: 'center' }}
                          description={<span style={{ color: '#333' }}>{item.desc}</span>}
                        />
                      </Card>
                    </Card>
                  </Col>
                );
              })
              : ''}
          </Row>
        </Spin>
        <ModalForm project />
      </>
    );
  }
}

const mapStatetoProps = (state) => ({
  taskReducer: state.taskReducer,
  authReducer: state.authReducer,
});
const mapDispatchToProps = (dispatch) => ({
  TaskListAction: bindActionCreators(TaskAction, dispatch),
  ModalListAction: bindActionCreators(ModalAction, dispatch),
  ProjectListAction: bindActionCreators(ProjectAction, dispatch),
});
const withConnect = connect(mapStatetoProps, mapDispatchToProps);
export default compose(withConnect)(Project);
