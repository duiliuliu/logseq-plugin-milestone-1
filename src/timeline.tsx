// App.tsx
import React, { useState, useEffect } from 'react';
import Calendar from 'antd/lib/calendar';
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button';
import Timeline from 'antd/lib/timeline';

import { ArrowsAltOutlined, ShrinkOutlined, FieldTimeOutlined, DoubleRightOutlined, DoubleLeftOutlined, ClockCircleOutlined, DownOutlined, UpOutlined, SmileOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment'
import 'antd/es/calendar/style/css.js';
import 'antd/es/button/style/css.js';
import 'antd/es/tooltip/style/css.js';
import 'antd/es/timeline/style/css.js';


import { findDays, getBlockContent, getMilestones } from './util';

const App: React.FC<{ uuid?: string; pageName?: string; forceUpdate: number }> = ({ uuid, pageName, forceUpdate }) => {
  const [milestones, setMilestones] = useState<{ content: string, date: Moment }[]>()
  const [hidden, setHiddens] = useState<number[]>([])
  const [isTimelineView, setIsTimelineView] = useState<boolean>(true);
  const [isWideMode, setWideMode] = useState(false)
  const [isLeftMode, setLeftMode] = useState(true)
  const [reverse, setReverse] = useState(false);


  useEffect(() => {
    const fetchMilestones = async () => {
      if (uuid) {
        const blockContent = await getBlockContent(uuid, { includeChildren: true });
        const parsedMilestones = getMilestones(blockContent);
        const sortedMilestones = parsedMilestones?.sort((a, b) => {
          return a.date.isBefore(b.date) ? -1 : 1;
        });
        setMilestones(sortedMilestones);
      }
      if (pageName) {
        const sortedMilestones = (await findDays(pageName))?.sort((a, b) => {
          return a.date.isBefore(b.date) ? -1 : 1;
        });
        setMilestones(sortedMilestones);
      }
      if (uuid && pageName) {
        const blockContent = await getBlockContent(uuid, { includeChildren: true });
        const parsedMilestones = getMilestones(blockContent);
        const parsedMilestones2 = await findDays(pageName)
        //@ts-ignore
        const sortedMilestones = [...parsedMilestones, ...parsedMilestones2]?.sort((a, b) => {
          return a.date.isBefore(b.date) ? -1 : 1;
        });
        setMilestones(sortedMilestones);
      }

    };

    fetchMilestones();
  }, [pageName, uuid, forceUpdate]);

  const toggleView = () => {
    setIsTimelineView(!isTimelineView);
  };

  const switchWideMode = (isWidMode) => {
    setWideMode(isWidMode)
  }

  const switchLeftMode = () => {
    setLeftMode(!isLeftMode)
  }

  const handleReverse = () => {
    setReverse(!reverse);
  };


  const dateCellRender = (date: Moment) => {
    const curDateMilestones = milestones?.filter((m) => m.date.isSame(date, 'day'))
    return curDateMilestones?.map((m, index) => {
      const isBefore = m.date.isBefore(moment(), 'day')
      return (
        <Tooltip title={m.content} arrowPointAtCenter>
          <div className={`whitespace-nowrap bg-blue-200 rounded-sm mb-1 ${isBefore ? 'opacity-50' : ''}`} key={m.date.valueOf() + index}>
            <div data-ref={m.content} dangerouslySetInnerHTML={{ __html: m.content }}  ></div>
          </div>
        </Tooltip>
      )
    })
  }


  return (
    <>
      <div className="w-screen h-screen absolute bg-transparent" onClick={() => logseq.hideMainUI()}></div>
      <div className={`${isWideMode ? 'w-2/3' : 'w-1/3'} h-5/6 bg-white absolute top-12 right-4 shadow-lg p-1 overflow-auto rounded transition-all`}>
        <div className="absolute left-4 top-4">
          {
            isWideMode
              ? <Button shape="circle" icon={<ShrinkOutlined />} onClick={() => switchWideMode(false)}></Button>
              : <Button shape="circle" icon={<ArrowsAltOutlined />} onClick={() => switchWideMode(true)}></Button>
          }
        </div>
        <div className="p-4">
          {/* <div className="flex justify-between items-center mb-4"> */}
          <div className="absolute left-16 top-4">
            <Button
              shape="circle"
              icon={isTimelineView ? <FieldTimeOutlined /> : <FieldTimeOutlined />}
              onClick={toggleView}
            >
              {/* {isTimelineView ? '返回日历视图' : '显示时间轴'} */}
            </Button>
          </div>

          <div className="absolute left-28 top-4">
            <Button
              shape="circle"
              icon={isLeftMode ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
              onClick={switchLeftMode}
            >
            </Button>
          </div>
          <div className="absolute left-40 top-4">
            <Button
              shape="circle"
              icon={reverse ? <DownOutlined /> : <UpOutlined />}
              onClick={handleReverse}
            >
            </Button>
          </div>
          <div className="absolute left-52 top-4">
            <Button
              shape="circle"
              icon={hidden.length > 0 ? <SmileOutlined rotate={180} onClick={() => setHiddens([])} /> : <SmileOutlined />}
              onClick={handleReverse}
            >
            </Button>
          </div>


          <br />
          <br />
          {isTimelineView ? (
            <>
              <Timeline reverse={reverse} mode={isLeftMode ? 'left' : 'alternate'}>
                {milestones?.filter((item, index) => !hidden?.includes(index)).map((milestone, index) => (
                  <Timeline.Item
                    dot={<ClockCircleOutlined style={{ fontSize: '16px' }} onClick={() => {
                      setHiddens(prev => [...prev, index])
                    }} />}
                    label={milestone.date.format('YYYY-MM-DD')} >
                    <div data-ref={milestone.content} dangerouslySetInnerHTML={{ __html: milestone.content }}  ></div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </>

          ) : (
            <Calendar dateCellRender={dateCellRender} />
          )}
        </div>
      </div>
    </>



  );
};

export default App;