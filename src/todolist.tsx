import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import styled from "styled-components";

interface Task {
  id: string;
  text: string;
}

const TodoListWrapper = styled.div`
  max-width: 700px;
  margin: 10px auto;
  padding: 20px;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const TaskInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const TaskInput = styled.input`
  width: 250px;
  padding: 13px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border 0.3s ease;
  &:focus {
    border-color: #4caf50;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #45a049;
  }
`;

const TaskItem = styled.div<{ isDragging: boolean }>`
  padding: 12px;
  background: ${(props) => (props.isDragging ? "#e0e0e0" : "#ffffff")};
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 7px;
  box-shadow: ${(props) =>
    props.isDragging ? "0 10px 20px rgba(0, 0, 0, 0.1)" : "none"};
  transition: all 0.2s ease;
  opacity: ${(props) => (props.isDragging ? 0.9 : 1)};
  display: flex;
  flex-wrap: wrap;             /* İçeriğin alt satıra geçmesine izin verir */
  gap: 8px;                    /* Elemanlar arası boşluk */
  align-items: flex-start;     /* Üst hizalama */
  min-height: 48px;
`;

const TaskText = styled.div`
  flex: 1;
  text-align: left;
  padding-right: 10px;
  white-space: pre-wrap;       /* Alt satıra geçişi sağlar */
  word-wrap: break-word;       /* Uzun kelimeleri böler */
  word-break: break-word;      /* Gerektiğinde kelimeleri böler */
  min-width: 0;                /* Flex item'ın küçülmesine izin verir */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
  flex-shrink: 0;
  margin-left: auto;           /* Butonları sağa yaslar */
`;

const EditButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #ffa500;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  &:hover {
    background-color: #e68900;
  }
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e53935;
  }
`;

const TaskContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  background: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const EditInput = styled.input`
  flex: 1;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const SaveButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #45a049;
  }
`;

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>("");


  
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = { id: Date.now().toString(), text: newTask };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  const handleRemoveTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId: string) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTaskId(taskId);
      setEditedTaskText(taskToEdit.text);
    }
  };

  const handleSaveEditedTask = () => {
    if (editingTaskId && editedTaskText.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: editedTaskText } : task
        )
      );
      setEditingTaskId(null);
      setEditedTaskText("");
    }
  };

  return (
    <TodoListWrapper>
      <Heading>My Todo List</Heading>
      <TaskInputWrapper>
        <TaskInput
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Yeni görev ekle"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <AddButton onClick={handleAddTask}>Ekle</AddButton>
      </TaskInputWrapper>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <TaskContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <TaskItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    >
                      {editingTaskId === task.id ? (
                        <div style={{ display: 'flex', width: '100%', gap: '8px' }}>
                          <EditInput
                            type="text"
                            value={editedTaskText}
                            onChange={(e) => setEditedTaskText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSaveEditedTask()}
                          />
                          <SaveButton onClick={handleSaveEditedTask}>Kaydet</SaveButton>
                        </div>
                      ) : (
                        <>
                          <TaskText>{task.text}</TaskText>
                          <ButtonGroup>
                            <EditButton onClick={() => handleEditTask(task.id)}>
                              Düzenle
                            </EditButton>
                            <RemoveButton onClick={() => handleRemoveTask(task.id)}>
                              🗑️
                            </RemoveButton>
                          </ButtonGroup>
                        </>
                      )}
                    </TaskItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TaskContainer>
          )}
        </Droppable>
      </DragDropContext>
    </TodoListWrapper>
  );
};


export default TodoList;