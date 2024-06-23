// App.tsx
import React, { useState, useEffect } from 'react';
import Calendar from 'antd/lib/calendar';
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button';
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment'
import 'antd/es/calendar/style/css.js';
import 'antd/es/button/style/css.js';
import { getBlockContent, getMilestones } from './util';

const App: React.FC<{ uuid: string; forceUpdate: number }> = ({ uuid, forceUpdate }) => {
  const [milestones, setMilestones] = useState<{ content: string, date: Moment }[]>()
  const [isTimelineView, setIsTimelineView] = useState<boolean>(false);

  useEffect(() => {
    const fetchMilestones = async () => {
      const blockContent = await getBlockContent(uuid, { includeChildren: true });
      const parsedMilestones = getMilestones(blockContent);
      setMilestones(parsedMilestones);
    };

    fetchMilestones();
  }, [uuid, forceUpdate]);

  const toggleView = () => {
    setIsTimelineView(!isTimelineView);
  };

  const dateCellRender = (date: Moment) => {
    const curDateMilestones = milestones?.filter((m) => m.date.isSame(date, 'day'))
    return curDateMilestones?.map((m, index) => {
      const isBefore = m.date.isBefore(moment(), 'day')
      return (
        <Tooltip title={m.content} arrowPointAtCenter>
          <div className={`whitespace-nowrap bg-blue-200 rounded-sm mb-1 ${isBefore ? 'opacity-50' : ''}`} key={m.date.valueOf() + index}>
            {m.content}
          </div>
        </Tooltip>
      )
    })
  }


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button
          shape="circle"
          icon={isTimelineView ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
          onClick={toggleView}
        >
          {isTimelineView ? '返回日历视图' : '显示时间轴'}
        </Button>
      </div>
      {isTimelineView ? (
        <div className="timeline-view">
          {milestones?.map((milestone, index) => (
            <div key={index} className="milestone-item">
              <div className="date">{milestone.date.format('YYYY-MM-DD')}</div>
              <div className="content">{milestone.content}</div>
            </div>
          ))}
        </div>
      ) : (
        <Calendar dateCellRender={dateCellRender} />
      )}
    </div>
  );
};

export default App;