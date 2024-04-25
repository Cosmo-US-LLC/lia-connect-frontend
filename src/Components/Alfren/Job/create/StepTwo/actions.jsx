import { useDrag } from "react-dnd";
export const ItemTypes = {
  BOX: "box",
};
const style = {
  cursor: "move",
  float: "center",
};
export const Actions = function Box({ id, name, color }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
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
