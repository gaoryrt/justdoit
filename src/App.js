import dayjs from 'dayjs';
import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [list, setList] = useState([{
    key: 0,
    name: 'a',
    duration: 5,
    lasttime: 1669893940000
  }, {
    key: 2,
    name: '洗衣服（例）',
    duration: 10,
    lasttime: 1610184327000
  }])
  return <div className="list">{
    list
      .sort((b, a) => (b.lasttime + b.duration * 86400000) - (a.lasttime + a.duration * 86400000))
      .map(o => <Card onRenew={() => {
        setList(l => l.map(o2 => {
          if (o2.key !== o.key) return o2
          return {...o2, lasttime: +new Date()}
        }))
      }} onDel={() => {}} key={o.key} {...o}/>)
  }
  <div className='plus center' onClick={async () => {
    const name = window.prompt('该活动叫什么')
    const duration = window.prompt('每几天做一次')
    const lasttime = dayjs(window.prompt('上次啥时候做的？YYYYMMDD')).valueOf()
    setList(l => l.concat({
      key: +new Date(),
      name,
      duration,
      lasttime
    }))
  }}>
    <svg width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"></path></svg>  </div>
  </div>
}


const Card = ({name, duration, lasttime, onRenew, onDel}) => {
  const diff = Math.floor((lasttime + duration * 86400000 - new Date()) / 86400000)
  return <div className='line card' onDoubleClick={onDel}>
    <div className="c">{name}</div>
    <div className="grow"></div>
    <div className='c'>
      <div className="s">每 {duration} 天一次</div>
      <div className="s g">上次：{dayjs(lasttime).format('YYYY-MM-DD')}</div>
    </div>
    <div className="renew center" onClick={onRenew}>
      <div className="b">{Math.max(0, diff)}</div>
    </div>
  </div>
}

