import React from "react";
import "./Column.css";

type Props = {
  title: string;
  tasks?: string[];
};

export const Column = ({ title, tasks }: Props) => {
  return (
    <div className="boc-column-wrapper">
      <div className="boc-title">{title}</div>
      <div className="boc-tasks-list">
        {tasks &&
          tasks.map((task) => <div className="boc-single-task">{task}</div>)}
      </div>
    </div>
  );
};
