import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
export const ItemTypes = {
  BOX: "box",
};
const style = {
  cursor: "move",
  float: "center",
};
export const Actions = ({
  key,
  id,
  name,
  optionId,
  color,
  addSequenceRecord,
}) => {
  const actionDetails = {
    1: {
      options: [{ id: 1, name: "Default" }],
      name: "View Profile",
      input: null,
    },
    2: {
      options: [
        { id: 1, name: "Still not Accepted" },
        { id: 2, name: "Accepted" },
      ],
      name: "Send Request",
      input: null,
    },
    3: {
      options: [{ id: 1, name: "Default" }],
      name: "Withdraw Connection Request",
      input: null,
    },
    4: {
      options: [
        { id: 1, name: "Candidate Not Replied" },
        { id: 2, name: "Candidate Replied" },
      ],
      name: "Send Message",
      input: null,
    },
  };
  let seq = [];

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id, name, optionId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const parentSequence = dropResult.id ? dropResult.id : 0;
        addSequenceRecord({
          sequenceId: parentSequence
            ? parentSequence.id + parentSequence.optionId + 1
            : 1,
          actionId: item.id,
          actionName: item.name,
          options: actionDetails[item.id].options,
          parentSequenceId: parentSequence ? parentSequence.id : 0,
          parentOptionId: parentSequence ? parentSequence.optionId : 1,
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div key={key} ref={drag} style={{ ...style, opacity }} data-testid={`box`}>
      <span style={{ color: color }}> {name}</span>
    </div>
  );
};
