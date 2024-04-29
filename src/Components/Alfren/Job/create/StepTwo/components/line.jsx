export const Line = ({ marginBottom, marginTop }) => {
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
          borderLeft: "1px solid #DFDFDF",
          height: "50px",
          left: "50%",
          marginLeft: "-3px",
          top: "0",
          marginTop: marginTop,
          marginBottom: marginBottom,
        }}
      ></div>
    </div>
  );
};
