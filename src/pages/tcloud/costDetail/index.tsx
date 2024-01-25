/*
 * @creater: panan
 * @message: detail page
 * @since: 2024-01-22 14:31:11
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-01-23 15:54:49
 * @文件相对于项目的路径: /logic-umi/src/pages/tcloud/costDetail/index.tsx
 */
import { Card, DatePicker, Space, Button, Tabs } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import Title from '../components/title';
import dayjs from 'dayjs';
import { extractYearFromString } from '../utils';
import TabItems from './tabItems';

interface Props {
  year: string;
  checkList: any[];
}

const { RangePicker } = DatePicker;

const CostDetail: FC<Props> = (props) => {
  const { year, checkList } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<any>();
  const [selectDate, setSelectDate] = useState<any>();
  const [num, setNum] = useState<number>(1);

  const setAllYear = (isFirst?: boolean) => {
    const currentYear = extractYearFromString(year)
    const startDate = dayjs(currentYear).startOf('year').format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs(currentYear).endOf('year').format('YYYY-MM-DD HH:mm:ss');
    console.log(currentYear, checkList)
    console.log(startDate, endDate)
    setDate([dayjs(startDate), dayjs(endDate)]);
    if (isFirst) {
      setSelectDate([dayjs(startDate), dayjs(endDate)])
    }
  }

  const setMonths = (num: number) => {
    const currentYear = extractYearFromString(year)
    const startDate = dayjs(currentYear).startOf('year').format('YYYY-MM-DD HH:mm:ss');
    const middleDate = dayjs(startDate).month(5).endOf('month').format('YYYY-MM-DD HH:mm:ss');
    const middleStartDate = dayjs(startDate).month(6).startOf('month').format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs(currentYear).endOf('year').format('YYYY-MM-DD HH:mm:ss');
    if (num === 1) {
      setDate([dayjs(startDate), dayjs(middleDate)]);
    }
    if (num === 2) {
      setDate([dayjs(middleStartDate), dayjs(endDate)]);
    }
  }

  const fetchData = () => {
    setNum(num + 1)
  }

  useEffect(() => {
    if (!year || !checkList) return;
    setAllYear(true)
  }, [year, checkList])

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current: any) => {
    const currentYear = extractYearFromString(year)
    const startDate = dayjs(currentYear).startOf('year').format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs(currentYear).endOf('year').format('YYYY-MM-DD HH:mm:ss');
    return current && (current < dayjs(startDate) || current > dayjs(endDate));
  };

  const items = [
    {
      key: '1',
      label: '按TCP项目组',
      children: <TabItems date={selectDate} {...props} num={num}/>
    }
  ]

  return (
    <Card
      title={
        <Title title="费用明细" loading={loading} refresh={fetchData} />
      }
      headStyle={{
        padding: 0,
        margin: 0,
      }}
      loading={loading}
      extra={(
        <RangePicker
          picker="month"
          style={{ marginRight: '10px' }}
          value={date}
          onOpenChange={(status) => {
            if (!status) {
              console.log('要调接口了')
              const start = date[0]?.startOf('month').format('YYYY-MM-DD HH:mm:ss')
              const end = date[1]?.endOf('month').format('YYYY-MM-DD HH:mm:ss')
              setSelectDate([start, end])
            }
          }}
          disabledDate={disabledDate}
          onChange={(value) => {
            setDate(value);
          }}
          renderExtraFooter={() => {
            return (
              <div style={{
                textAlign: 'right',
                margin: '10px 0'
              }}>
                <Space>
                  <Button type='primary' onClick={() => {
                    setMonths(1)
                  }}>上半年</Button>
                  <Button type='primary' onClick={() => {
                    setMonths(2)
                  }}>下半年</Button>
                  <Button type='primary' onClick={() => {
                    setAllYear()
                  }}>全年</Button>
                </Space>
              </div>
            )
          }}
        />
      )}
    >
      <Tabs items={items} />
    </Card>
  )
}

export default CostDetail
