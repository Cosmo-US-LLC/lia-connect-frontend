export const HorizontalLine = ({ x, y1, x2, y2 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          left: "50%",
          marginLeft: "-3px",
          top: "0",
          marginBottom: "10px",
          borderTop: "1px solid #8FA8D7",
          borderLeft: "1px solid #8FA8D7",
          borderRight: "1px solid #8FA8D7",
          height: "50px",
          width: "50%",
        }}
      ></div>
    </div>
  );
};
