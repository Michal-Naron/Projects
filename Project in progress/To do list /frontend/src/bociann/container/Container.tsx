import React from "react";
import "./Container.css";
import { Column } from "../Column/Column";

export const Container = () => {
  return (
    <div className="boc-container">
      <Column title="to-do" tasks={["1", "2"]} />
      <Column title="in-progress" />
      <Column title="done" />
      <Column title="question" />
      <Column title="whatever" />
    </div>
  );
};
