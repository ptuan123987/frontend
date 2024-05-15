import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { API_URL, access_token } from '../../../Constants';
import { Button } from 'antd';
import Dropdown from '../Dropdown/Dropdown';

const LoginRecords = () => {
    const [chartData, setChartData] = useState({});
    const [selectedType, setSelectedType] = useState('daily');
    const [selectedPeriod, setSelectedPeriod] = useState(14);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
    const typeDropdownRef = useRef(null);
    const periodDropdownRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = '';
                if (selectedType === 'daily') {
                    url = `${API_URL}api/analytics/daily-revenue?days=${selectedPeriod}`;
                } else if (selectedType === 'monthly') {
                    url = `${API_URL}api/analytics/monthly-revenue?months=${selectedPeriod}`;
                } else if (selectedType === 'yearly') {
                    url = `${API_URL}api/analytics/yearly-revenue?years=${selectedPeriod}`;
                }
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                const revenue = response.data.revenue;
                console.log(revenue);
                setChartData({
                    labels: Object.keys(revenue),
                    datasets: [
                        {
                            label: 'Revenue Records',
                            data: Object.values(revenue),
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching login data:', error);
            }
        };

        fetchData();
    }, [selectedType, selectedPeriod]);

    const handleTypeDropdownToggle = () => {
        setIsTypeDropdownOpen(!isTypeDropdownOpen);
    };

    const handlePeriodDropdownToggle = () => {
        setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
    };

    const handleTypeSelect = value => {
        setSelectedType(value);
        setIsTypeDropdownOpen(false);
        if (value === 'daily') {
            setSelectedPeriod(14);
        } else if (value === 'monthly') {
            setSelectedPeriod(12);
        } else if (value === 'yearly') {
            setSelectedPeriod(5);
        }
    };

    const handlePeriodSelect = value => {
        setSelectedPeriod(value);
        setIsPeriodDropdownOpen(false);
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    },
                },
            },
        },
    };

    return (
        <div className="relative my-5">
            <h2 className="text-2xl font-bold mb-4">Revenue Analytics</h2>
            <div className="flex justify-end">
                <div className="relative inline-block">
                    <Button type="primary" onClick={handleTypeDropdownToggle} ref={typeDropdownRef} className="bg-white border border-gray-200 mx-[50px] px-[10px] py-[5px] rounded-[5px]">
                        {selectedType.toUpperCase()}
                    </Button >
                    {isTypeDropdownOpen && (
                        <Dropdown style={{ top: typeDropdownRef.current.offsetHeight, left: typeDropdownRef.current.offsetLeft }} >
                            <ul>
                                <li>
                                    <a href="#" onClick={() => handleTypeSelect('daily')}>Daily</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => handleTypeSelect('monthly')}>Monthly</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => handleTypeSelect('yearly')}>Yearly</a>
                                </li>
                            </ul>
                        </Dropdown>
                    )}
                </div>
                <div className='relative'>
                    <Button type="primary" onClick={handlePeriodDropdownToggle} ref={periodDropdownRef} className="bg-white border border-gray-200 px-[10px] py-[5px] rounded-[5px]">
                        {selectedPeriod} {selectedType === 'monthly' ? 'months' : selectedType === 'daily' ? 'days' : 'years'}
                    </Button>

                    {isPeriodDropdownOpen && (
                        <Dropdown style={{ top: periodDropdownRef.current.offsetHeight, left: periodDropdownRef.current.offsetLeft }}>
                            <ul>
                                {selectedType === 'daily' && (
                                    <>
                                        <li>
                                            <a href="#" onClick={() => handlePeriodSelect(7)}>7 days</a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={() => handlePeriodSelect(14)}>14 days</a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={() => handlePeriodSelect(28)}>28 days</a>
                                        </li>
                                    </>
                                )}
                                {selectedType === 'monthly' && (
                                    <li>
                                        <a href="#" onClick={() => handlePeriodSelect(12)}>12 months</a>
                                    </li>
                                )}
                                {selectedType === 'yearly' && (
                                    <li>
                                        <a href="#" onClick={() => handlePeriodSelect(5)}>5 years</a>
                                    </li>
                                )}
                            </ul>
                        </Dropdown>
                    )}
                </div>
            </div>
            {chartData.labels && chartData.datasets && (
                <Line data={chartData} options={options} />
            )}
        </div>
    );
};

export default LoginRecords;
