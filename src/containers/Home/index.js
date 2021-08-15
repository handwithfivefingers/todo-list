import React, { Component } from 'react';
import {
  Progress, Row, Col, Tooltip, Avatar, Card, Space,
  Statistic, Slider, Spin
} from 'antd';
import {
  SearchOutlined, CheckOutlined, CloseOutlined, ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import PS from './../../assets/img/PS.png';
import AI from './../../assets/img/AI.png';
import Blender from './../../assets/img/Blender.png';
import VS from './../../assets/img/VS.png';
import { Line, Area } from '@ant-design/charts';
import moment from 'moment';
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
const api = "https://api.zingnews.vn/public/v2/corona/getChart";
const province = "https://api.zingnews.vn/public/v2/corona/getChart?type=province";
class Home extends Component {
  state = {
    project: null,
    last15Days: {
      data: [],
      height: 400,
      xField: 'x',
      yField: 'y',
      tooltip: {
        formatter: (datum) => {
          return { name: datum.x, value: datum.y + ' ca' };
        },
      },
      point: {
        size: 5,
        shape: 'diamond',
      },
      xAxis: {
        title: {
          text: 'Từ 15 ngày trước',
          style: { fontSize: 18 },
        }
      }
    },
    lastAprilToNow: {
      data: [],
      xField: 'x',
      yField: 'y',
      xAxis: {
        range: [0, 1],
      },
      xAxis: {
        title: {
          text: 'Từ 27/4 đến nay',
          style: { fontSize: 18 },
        }
      },
      tooltip: {
        formatter: (datum) => {
          return { name: datum.x, value: datum.y + ' ca' };
        },
      },
    },
    today: 0,
    total: 0,
    lastUpdated: null,
    loading: false,
  };

  applyTask(item) {
    this.setState({
      project: item,
    });
  }
  componentDidMount() {
    const { taskReducer } = this.props;
    if (taskReducer.project) {
      this.applyTask(taskReducer.project[0]);
    }
    this.setState({ loading: true })
    const res = axios.get(`${api}`);
    res.then(response => {
      this.setState({
        last15Days: {
          ...this.state.last15Days,
          data: response.data.data.vn.cases // 100
        },
        lastAprilToNow: {
          ...this.state.lastAprilToNow,
          data: response.data.data.vnSeason4.cases
        },
        today: response.data.data.vnSeason4.toDay,
        total: response.data.data.vnSeason4.total,
        lastUpdate: moment.utc(response.data.data.lastUpdated * 1000).format('HH')
        // lastUpdate: moment.utc(response.data.data.vnSeason4CommunityDaily.lastUpdated * 1000).format('HH'),
      })
    }).catch(error => {
      console.log('error:', error)
    }).finally(() => {

      this.setState({ loading: false })
    })
  }
  componentDidUpdate(prevProps) {
    const { taskReducer } = this.props;
    if (prevProps.taskReducer.project !== taskReducer.project) {
      this.applyTask(taskReducer.project[0]);
    }
  }
  render() {
    return (
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Space>
            <h2>Số liệu Covid-19 tại Việt Nam</h2>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Row>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Spin spinning={this.state.loading}>
                <Card>
                  <Statistic
                    title="Tổng số ca nhiễm hôm nay"
                    value={this.state.today}
                    // precision={2}
                    valueStyle={{ color: 'rgba(239,68,68,1)' }}
                    prefix={<ArrowUpOutlined />}
                    suffix=" ca"
                  />
                </Card>
              </Spin>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Spin spinning={this.state.loading}>
                <Card>
                  <Statistic
                    title="Tổng số ca nhiễm cả nước"
                    value={this.state.total}
                    // precision={2}
                    valueStyle={{ color: 'rgba(239,68,68,1)' }}
                    prefix={<ArrowUpOutlined />}
                    suffix=" ca"
                  />
                </Card>
              </Spin>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Spin spinning={this.state.loading}>
            <Card>
              <Statistic
                title="Cập nhật theo Zingnew:"
                value={this.state.lastUpdate}
                // precision={2}
                valueStyle={{ color: '#3f8600' }}
                // prefix={<ArrowUpOutlined />}
                suffix=" giờ trước"
              />
            </Card>
          </Spin>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Spin spinning={this.state.loading}>
            <Line {...this.state.last15Days} />
          </Spin>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Area {...this.state.lastAprilToNow} />
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
