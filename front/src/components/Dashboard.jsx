import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import axios from 'axios';
import { Pie, Column } from '@ant-design/plots';

const Dashboard = () => {
    const [summary, setSummary] = useState({
        byCountry: {},
        byCourseTitle: {},
        validityStats: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:4000/dashboard/summary');
            setSummary(res.data);
        };
        fetchData();
    }, []);

    const convertToChartData = (data) =>
        Object.entries(data || {}).map(([key, value]) => ({
            type: key,
            value: Number(value),
        }));



    return (

        <div style={{ padding: 12 }}>
            <h2>Dashboard</h2>
            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <Card title="Courses by Country">
                        <Pie
                            data={convertToChartData(summary.byCountry)}
                            angleField="value"
                            colorField="type"
                            radius={0.9}
                            label={{ type: 'inner', offset: '-30%', content: '{value}' }}
                            interactions={[{ type: 'element-active' }]}
                        />
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="Courses by Title">
                        <Pie
                            data={convertToChartData(summary.byCourseTitle)}
                            angleField="value"
                            colorField="type"
                            radius={0.9}
                            label={{
                                type: 'spider',
                                content: '{type}: {value} ({percentage})',
                            }}

                            interactions={[{ type: 'element-selected' }, { type: 'element-active' }]}
                        />
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Valid From - Year Wise">
                        <Column
                            data={convertToChartData(summary.validityStats)}
                            xField="type"
                            yField="value"
                            label={{ position: 'top' }}
                            xAxis={{ label: { autoHide: true, autoRotate: false } }}
                            meta={{ type: { alias: 'Year' }, value: { alias: 'Courses Count' } }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
