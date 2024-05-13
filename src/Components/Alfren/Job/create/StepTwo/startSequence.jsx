import { useDrop } from "react-dnd";
import { Image } from "../../../../../AbstractElements";
import startSequence from "../../../../../assets/used-files/images/startSequence.png";

export const ItemTypes = {
  BOX: "box",
};

export const SequenceStart = ({ id, name }) => {
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(_item, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        return { name, id };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    []
  );

  return (
    <div
      className="mt-5 d-flex  justify-content-center align-items-center"
      style={{ height: "60vh" }}
    >
      <>
        {" "}
        <div ref={drop}>
          <Image attrImage={{ src: startSequence }} />
        </div>
      </>
    </div>
  );
};
