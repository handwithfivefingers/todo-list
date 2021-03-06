import {
  EditOutlined,
  LoginOutlined, PlusSquareOutlined, RestOutlined, UserAddOutlined
} from '@ant-design/icons';
import { Button, Col, Popover, Progress, Row, Spin, Popconfirm, Card, message, Modal, Mentions } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { ModalAction, TaskAction, ProjectAction } from '../../actions';
import ModalForm from '../../components/Layout/UI/Modal/ModalForm';
import UserSelected from '../../components/Layout/UI/Modal/UserSelected';
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
    loading: false,
    childModal: {
      component: null,
      visibile: false,
      width: '50%'
    }
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
    message.success('???? x??a Project');
  }
  addUser = (item) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        component: <UserSelected projectId={item._id} onClose={() => this.setState({ childModal: { ...this.state.childModal, visible: false } })} />,
      }
    })
  }
  renderAction = (item) => {
    const { taskReducer, authReducer } = this.props;
    let xhtml = [];
    if (item.userAccess.length > 0) {
      let index = -1;
      index = item.userAccess.findIndex(id => id === authReducer.user._id && id !== item.userOwner)
      if (index !== -1) {
        xhtml.push(<Link
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
        </Link>)
      } else {
        xhtml.push(<Link
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
          ,
          <EditOutlined onClick={() => this.EditProject(item)} />
          ,
          <UserAddOutlined onClick={() => this.addUser(item)} />
          ,
          <Popconfirm
            title="B???n c?? ch???c mu???n x??a task n??y ?"
            onConfirm={(e) => this.deleteProject(item)}
            okText="X??a"
            cancelText="Kh??ng"
          >
            <RestOutlined key="restout" />
          </Popconfirm>)
      }
    } else {
      xhtml.push(<Link
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
        ,
        <EditOutlined onClick={() => this.EditProject(item)} />
        ,
        <UserAddOutlined onClick={() => this.addUser(item)} />
        ,
        <Popconfirm
          title="B???n c?? ch???c mu???n x??a task n??y ?"
          onConfirm={(e) => this.deleteProject(item)}
          okText="X??a"
          cancelText="Kh??ng"
        >
          <RestOutlined key="restout" />
        </Popconfirm>)
    }
    return xhtml;
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
                      actions={this.renderAction(item)}
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
        <Modal
          onOk={() => console.log('ok')}
          footer={null}
          onCancel={() => this.setState({ childModal: { visible: false } })}
          visible={this.state.childModal.visible}
          maskClosable={false}
        >
          {this.state.childModal.component}
        </Modal>
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
