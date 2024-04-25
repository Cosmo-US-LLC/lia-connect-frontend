import { useState } from "react";
import { useDrop } from "react-dnd";
import { Image } from "../../../../../AbstractElements";
import startSequence from "../../../../../assets/used-files/images/startSequence.png";
import { id } from "date-fns/locale";
import { Plus } from "react-feather";
import { BorderRadius } from "../../../../../Constant";

export const ItemTypes = {
  BOX: "box",
};
function getStyle() {
  return {
    border: "1px dashed  #DADADA",
    boxShadow: "0px 6px 20px 0px #0000000F",
    borderRadius: "4px",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
  };
}
export const Sequence = ({ firstNode = false, id, name, greedy, children }) => {
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(_item, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop && !greedy) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
        return { name, id, firstNode };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [greedy, setHasDropped, setHasDroppedOnChild]
  );

  return (
    <div
      className="mt-5 d-flex  justify-content-center align-items-center"
      style={{ height: "60vh" }}
    >
      {firstNode ? (
        <>
          {" "}
          <div ref={drop}>
            <Image attrImage={{ src: startSequence }} />
            <br />
            {hasDropped && (
              <span>dropped {hasDroppedOnChild && " on child"}</span>
            )}
          </div>
        </>
      ) : (
        <>
          {" "}
          <div ref={drop} style={getStyle()}>
            <span style={{ marginTop: "8px", marginLeft: "4px" }}>
              <Plus strokeWidth={1} color={"#787878"} />
            </span>
            <span style={{ color: "#595959", padding: "10px" }}>
              {" "}
              Add Action{" "}
            </span>
            <span
              style={{
                color: "#787878",
                backgroundColor: "#EAE8E8",
                padding: "10px",
              }}
            >
              End
            </span>
            {/* <div>{children}</div> */}
          </div>
        </>
      )}
    </div>
  );
};
