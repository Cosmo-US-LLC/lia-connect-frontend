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
      options: [
        {
          id: 1,
          name: "Default",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
      ],
      name: "View Profile",
      input: null,
    },
    2: {
      options: [
        {
          id: 1,
          name: "Still not Accepted",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
        {
          id: 2,
          name: "Accepted",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
      ],
      name: "Send Request",
      input: null,
    },
    3: {
      options: [
        {
          id: 1,
          name: "Default",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
      ],
      name: "Withdraw Connection Request",
      input: null,
    },
    4: {
      options: [
        {
          id: 1,
          name: "Candidate Not Replied",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
        {
          id: 2,
          name: "Candidate Replied",
          delayTillNextActionValue: 14,
          delayTillNextActionType: "h",
        },
      ],
      name: "Send Message",
      input: null,
    },
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id, name, optionId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const parentSequence = dropResult ? dropResult : 0;

        addSequenceRecord({
          sequenceId: parentSequence
            ? parentSequence.id && parentSequence.optionId
              ? parentSequence.id + parentSequence.optionId + 1
              : 1
            : 1,
          actionId: item.id,
          actionName: item.name,
          options: actionDetails[item.id].options,
          parentSequenceId: parentSequence
            ? parentSequence.id
              ? parentSequence.id
              : 0
            : 0,
          parentOptionId: parentSequence
            ? parentSequence.optionId
              ? parentSequence.optionId
              : 1
            : 1,
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
