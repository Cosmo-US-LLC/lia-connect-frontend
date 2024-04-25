import { useDrag } from "react-dnd";
export const ItemTypes = {
  BOX: "box",
};
const style = {
  cursor: "move",
  float: "center",
};
export const Actions = function Box({
  id,
  name,
  color,
  sequence,
  setSequence,
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id, name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        setSequence([
          {
            id: dropResult.id,
            actionId: item.id,
            actionName: item.name,
            children: [],
          },
        ]);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...style, opacity }} data-testid={`box`}>
      <span style={{ color: color }}> {name}</span>
    </div>
  );
};
