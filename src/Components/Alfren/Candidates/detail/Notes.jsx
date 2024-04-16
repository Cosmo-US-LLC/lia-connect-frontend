import React, { Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader } from "reactstrap";

import TodoContext from "../../../../_helper/Todo";
import { H4, H5, Image, LI, UL } from "../../../../AbstractElements";
import PlusIcon from "../../../../assets/used-files/icons/plus.svg";
const Notes = () => {
  const { allTodos, removeItems } = useContext(TodoContext);

  // const [status, setStatus] = useState("pending");

  const handleRemoveTodo = (todoId) => {
    removeItems(todoId);
    toast.success("Deleted Task !");
  };
  // const handleMarkedTodo = (itemId, itemStatus) => {
  //   if (itemStatus === "completed") {
  //     setStatus("pending");
  //     selectedItem(itemId, status);
  //     toast.success("Task Completed !");
  //   } else if (itemStatus === "pending") {
  //     setStatus("completed");
  //     selectedItem(itemId, status);
  //     toast.error(" Task In-completed !");
  //   }
  // };

  return (
    <Fragment>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <H5>Notes</H5>
          <button className="btn btn-primary me-2 py-1 px-2">
            <Image
              attrImage={{
                src: PlusIcon,
                alt: "",
              }}
            />{" "}
            Add Note
          </button>
        </CardHeader>
        <CardBody>
          <div className="todo">
            <div className="todo-list-wrapper">
              <div className="todo-list-container todo-list-footer">
                <div
                  className="todo-list-body custom-scrollbar"
                  style={{ maxHeight: "350px", overflowY: "auto" }}
                >
                  <UL attrUL={{ className: "simple-list", id: "todo-list" }}>
                    {allTodos.length > 0
                      ? allTodos.map((todo, index) => (
                          <LI
                            attrLI={{
                              className: "task border-0 " + todo.status,
                            }}
                            key={index}
                          >
                            <div className="task-container">
                              <H4 attrH4={{ className: "task-label" }}>
                                {todo.title}
                              </H4>
                              <div className="d-flex align-items-center gap-4">
                                <H5 attrH5={{ className: "assign-name m-0" }}>
                                  {todo.date}
                                </H5>
                                <span className="task-action-btn">
                                  <span
                                    className="action-box large delete-btn"
                                    title="Delete Task"
                                    onClick={() => handleRemoveTodo(todo.id)}
                                  >
                                    <i className="icon">
                                      <i className="icon-trash"></i>
                                    </i>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </LI>
                        ))
                      : ""}
                  </UL>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default Notes;
