import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [list, setList] = useState(JSON.parse(localStorage.getItem('list') || '[]'));
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div className="list">
      {list
        .sort(
          (b, a) =>
            b.lasttime +
            b.duration * 86400000 -
            (a.lasttime + a.duration * 86400000)
        )
        .map((o) => (
          <Card
            onChange={(o3) => {
              const newList = list.map((o2) => {
                if (o2.key !== o.key) return o2;
                return { ...o2, ...o3 };
              });
              setList(newList);
            }}
            onDel={() => {
              if (window.confirm("确定删除本条？")) {
                setList((l) => l.filter((o2) => o2.key !== o.key));
              }
            }}
            key={o.key}
            {...o}
          />
        ))}
      <div
        className="plus center"
        onClick={async () => {
          const name = window.prompt("活动叫什么");
          if (!name) return;
          const duration = window.prompt("每几天做一次");
          const lasttime = dayjs(
            window.prompt("上次啥时候做的？YYYYMMDD")
          ).valueOf();
          const newList = list.concat({
            key: +new Date(),
            name,
            duration,
            lasttime,
          });
          setList(newList);
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

const Card = ({ name, duration, lasttime, onChange, onDel }) => {
  const diff = Math.floor(
    (lasttime + duration * 86400000 - new Date()) / 86400000
  );
  return (
    <div className="line card">
      <div
        className="c"
        onClick={() => {
          const name = window.prompt("活动叫什么");
          if (name) onChange({ name });
        }}
      >
        {name}
      </div>
      <div className="grow" onClick={onDel}></div>
      <div className="c">
        <div
          className="s"
          onClick={() => {
            const duration = window.prompt("每几天做一次");
            if (duration) onChange({ duration });
          }}
        >
          每 {duration} 天
        </div>
        <div
          className="s g"
          onClick={() => {
            const lasttime = dayjs(
              window.prompt("上次啥时候做的？YYYYMMDD")
            ).valueOf();
            onChange({ lasttime });
          }}
        >
          {dayjs(lasttime).format("YYYY-MM-DD")}
        </div>
      </div>
      <div
        className="renew center"
        onClick={() => {
          if (window.confirm("已经完成了吗"))
            onChange({ lasttime: +new Date() });
        }}
      >
        <div className="b">{diff}</div>
      </div>
    </div>
  );
};
