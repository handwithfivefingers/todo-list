import React, { Component } from 'react';
import {
  Progress, Row, Col, Tooltip, Avatar, Card, Space,
  Statistic, Slider, Spin, Table, Button, Input, Modal
} from 'antd';
import {
  SearchOutlined, CheckOutlined, CloseOutlined, ArrowUpOutlined,
  ArrowDownOutlined, EllipsisOutlined
} from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Line, Area, Column } from '@ant-design/charts';
import moment from 'moment';
import './style.css';
const getAll = "https://api.zingnews.vn/public/v2/corona/getChart";
const province = "https://api.zingnews.vn/public/v2/corona/getChart?type=province";
const vaccine = "https://api.zingnews.vn/public/v2/corona/getChart?type=vaccination2";
const provinceDetails = "https://api.zingnews.vn/public/v2/corona/getChart?type=provinces_detail";
const numFormat = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
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
    },
    lastAprilToNow: {
      data: [],
      xField: 'x',
      yField: 'y',
      xAxis: {
        range: [0, 1],
      },
      tooltip: {
        formatter: (datum) => {
          return { name: datum.x, value: datum.y + ' ca' };
        },
      },
      searchText: '',
      searchedColumn: '',
    },
    sourceData: [],
    vaccineData: [

    ],
    today: 0,
    total: 0,
    lastUpdated: null,
    loading: false,
    visible: false,
    provinceData: {
      data: [],
      xField: 'date',
      yField: 'case',
      tooltip: {
        formatter: (datum) => {
          return { name: datum.date, value: datum.case + ' ca' };
        },
      },
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
    },
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Tìm kiếm Tỉnh/Thành Phố`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        text
      ) : (
        text
      ),
  });
  columns = [
    {
      title: 'Tỉnh thành',
      dataIndex: 'x',
      key: 'x',
      width: '40%',
      ...this.getColumnSearchProps('x'),
    },
    {
      title: 'Ca trong ngày',
      dataIndex: 'y',
      key: 'y',
      width: '30%',
      sorter: (a, b) => a.y - b.y,
      render: (value, record, index) => {
        return (
          numFormat(record.y)
        )
      }
    },
    {
      title: 'Tổng ca nhiễm',
      dataIndex: 'z',
      key: 'z',
      sorter: (a, b) => a.z - b.z,
      sortDirections: ['descend', 'ascend'],
      render: (value, record, index) => {
        return (
          numFormat(record.z)
        )
      }
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      align: 'center',
      render: (value, record, index) => {
        return <Button size="small" onClick={(e) => this.ModalInfo(value)} icon={<EllipsisOutlined />}></Button>

      }
    }
  ]
  ModalInfo = async (value) => {
    const res = await this.checkProvinceDetails(value);
    let xhtml = null;
    if (res === true) {
      xhtml = <Spin spinning={this.state.loading}>
        {Modal.info({
          title: `${value.x} các ngày gần đây`,
          content: <Column {...this.state.provinceData} />,
          width: 'auto',
        })
        }
      </Spin>
    }
    return xhtml;
  }
  vaccineColumns = [
    {
      title: 'Tỉnh thành',
      dataIndex: 'provinceName',
      key: 'provinceName',
      width: '40%',
      ...this.getColumnSearchProps('provinceName'),
    },
    {
      title: 'Tiêm 1 Mũi',
      dataIndex: 'totalOnceInjected',
      key: 'totalOnceInjected',
      width: '30%',
      sorter: (a, b) => a.totalOnceInjected / a.population * 100 - b.totalOnceInjected / b.population * 100,
      render: (value, record, index) => {
        return (
          <Tooltip title={`${numFormat(record.totalOnceInjected)} liều`}>
            <Progress
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={(record.totalOnceInjected / record.population * 100).toString().substring(0, 2)}
              showInfo
            />
          </Tooltip>

        )
      }
    },
    {
      title: 'Tiêm 2 Mũi',
      dataIndex: 'totalTwiceInjected',
      key: 'totalTwiceInjected',
      sorter: (a, b) => a.totalTwiceInjected / a.population * 100 - b.totalTwiceInjected / b.population * 100,
      sortDirections: ['descend', 'ascend'],
      render: (value, record, index) => {
        return (
          <Tooltip title={`${numFormat(record.totalTwiceInjected)} liều`}>
            <Progress
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={(record.totalTwiceInjected / record.population * 100).toString().substring(0, 2)}
              showInfo
            />
          </Tooltip>
        )
      },
    }
  ]
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  componentDidMount() {
    this.setState({ loading: true })
    const res = axios.get(`${getAll}`);
    res.then(response => {
      this.setState({
        last15Days: {
          ...this.state.last15Days,
          data: response.data.data.vnSeason4Daily.cases.slice(response.data.data.vnSeason4Daily.cases.length - 15)
        },
        lastAprilToNow: {
          ...this.state.lastAprilToNow,
          data: response.data.data.vnSeason4.cases
        },
        today: response.data.data.vnSeason4.toDay,
        total: response.data.data.vnSeason4.total,
      })

    }).catch(error => {
      console.log('error:', error.response)
    }).finally(() => {
      this.setState({ loading: false })
    })
    const provinceData = axios.get(`${province}`);
    provinceData.then(response => {
      let now = moment(new Date()); //todays date
      let end = moment.utc((response.data.data.lastUpdated) * 1000); // another date
      let duration = moment.duration(now.diff(end));
      let hours = duration.asHours();
      this.setState({
        sourceData: response.data.data.cases,
        lastUpdate: hours.toString().substring(0, 2),
      })
    }).catch(error => {
      console.log('error:', error)
    }).finally(() => {
      this.setState({ loading: false })
    })
    this.getVaccine();
  }
  getVaccine = () => {
    axios.get(`${vaccine}`)
      .then(res => {
        this.setState({
          vaccineData: res.data.data
        })
      })
      .catch(err => {
        console.log(err.response);
      })
      .finally(() => {

      })
  }
  componentDidUpdate(prevProps) {
    const { taskReducer } = this.props;
    if (prevProps.taskReducer.project !== taskReducer.project) {
      this.applyTask(taskReducer.project[0]);
    }
  }
  checkProvinceDetails = async (value) => {
    this.setState({
      loading: true
    })
    const res = await axios.get(`${provinceDetails}`);
    if (res.status === 200) {
      const contentFilter = res.data.data.data.filter(item => item.province === value.x)
      this.setState({
        provinceData: {
          ...this.state.provinceData,
          data: contentFilter[0].detail
        },
        loading: false,
      })
      return true
    } else {
      return "something went wrong";
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
        <Col xs={24} sm={12} md={12} lg={6}>
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
        <Col xs={24} sm={12} md={12} lg={6}>
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
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic
              title={`${this.state.sourceData.length > 1 ? `${this.state.sourceData[0].x}` : ''} nhiều ca nhất`}
              valueStyle={{ color: 'rgba(239,68,68,1)' }}
              prefix={<ArrowUpOutlined />}
              value={`${this.state.sourceData.length > 1 ? this.state.sourceData[0].y : ''} ca`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card title="Thống kê từ 15 ngày trước">
            <Spin spinning={this.state.loading}>
              <Line {...this.state.last15Days} />
            </Spin>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card title="Thống kê từ 27/4">
            <Spin spinning={this.state.loading}>
              <Area {...this.state.lastAprilToNow} />
            </Spin>
          </Card>
        </Col>
        <Col span={24}>
          <Card title='Số liệu theo tỉnh thành'>
            <Table size="small" loading={this.state.loading} columns={this.columns} bordered dataSource={this.state.sourceData}>
            </Table>
          </Card>
        </Col>

        <Col span={24}>
          <Card title='Số liệu Vaccine'>
            <Table loading={this.state.loading} columns={this.vaccineColumns} bordered size="small" dataSource={this.state.vaccineData}>
            </Table>
          </Card>
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
