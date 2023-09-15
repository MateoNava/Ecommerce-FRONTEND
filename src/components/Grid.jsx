import React from "react";
import Card from "../commons/Card";

const Grid = ({ items, title }) => {
  return (
    <div className="contenedor-grid" style={{ margin: "0 8%" }}>
      <h1 className="titles">{title}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          padding: "40px",
          border: "3px inset black",
          marginTop: "40px",
          borderRadius: "20px"
        }}
      >
        {items.map((item, i) => {
          return <Card item={item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
