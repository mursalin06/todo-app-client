import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

// Drag and Drop
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Navbar from "../../Components/Navbar/Navbar";

const CATEGORIES = ["To-Do", "In Progress", "Done"];

const Tasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    useEffect(() => {
        if (!user) return;
        fetchTasks();
    }, [user]);

    const fetchTasks = async () => {
        try {
            // TODO:  Replace with your server base URL
            const res = await axios.get(`https://get-sh-t-done-server.vercel.app/tasks?userId=${user.uid}`);
            setTasks(res.data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const getTasksByCategory = (category) => {
        return tasks
            .filter((task) => task.category === category)
            .sort((a, b) => a.order - b.order);
    };

    // Add a new task
    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) {
            Swal.fire("Oops!", "Task title is required", "error");
            return;
        }
        try {
            const body = {
                title: newTaskTitle.trim(),
                description: newTaskDescription.trim(),
                category: "To-Do",
                userId: user.uid,
                order: Date.now(),
            };
            await axios.post("https://get-sh-t-done-server.vercel.app/tasks", body);
            setNewTaskTitle("");
            setNewTaskDescription("");
            fetchTasks();
            Swal.fire("Success!", "New task added!", "success");
        } catch (error) {
            Swal.fire("Error!", "Failed to add task", "error");
        }
    };

    // Delete a task
    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`https://get-sh-t-done-server.vercel.app/tasks/${taskId}`);
            fetchTasks(); // refetch
            Swal.fire("Deleted!", "Task has been deleted.", "success");
        } catch (error) {
            Swal.fire("Error!", "Failed to delete task", "error");
        }
    };

    // Handle drag end
    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const draggedTask = tasks.find((t) => t._id === draggableId);
        if (!draggedTask) return;

        const newCategory = destination.droppableId;
        const updatedTasks = [...tasks];
        let filtered = updatedTasks.filter((t) => t._id !== draggableId);

        const indexToInsert = destination.index;
        const timestamp = Date.now();

        const updatedTask = {
            ...draggedTask,
            category: newCategory,
            order: timestamp,
        };

        filtered.splice(indexToInsert, 0, updatedTask);
        setTasks(filtered);

        try {
            await axios.put(`https://get-sh-t-done-server.vercel.app/tasks/${draggableId}`, {
                category: newCategory,
                order: timestamp,
            });

        } catch (error) {
            console.error("Failed to update task order:", error);
            Swal.fire("Error!", "Failed to update task order", "error");
            fetchTasks();
        }
    };

    const handleEditTask = async (taskId, newTitle, newDesc) => {
        try {
            await axios.put(`https://get-sh-t-done-server.vercel.app/tasks/${taskId}`, {
                title: newTitle,
                description: newDesc,
            });
            fetchTasks();
            Swal.fire("Updated!", "Task updated successfully.", "success");
        } catch (error) {
            Swal.fire("Error!", "Failed to update task", "error");
        }
    };

    return (
        <div>
            <nav className="sticky top-0 z-50">
                <Navbar></Navbar>
            </nav>
            <div className="min-h-screen bg-lightBackground dark:bg-darkBackground p-4">
                <h1 className="text-3xl font-bold mb-4 text-center text-lightText dark:text-darkText">
                    Task Board
                </h1>

                {/* Add New Task */}
                <div className="max-w-md mx-auto mb-8 p-4 bg-white dark:bg-darkCardBackground rounded shadow">
                    <h2 className="text-xl font-semibold mb-2 text-lightText dark:text-darkText">
                        Add a New Task
                    </h2>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="input input-bordered w-full mb-2"
                    />
                    <textarea
                        placeholder="Task Description (optional)"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        className="textarea textarea-bordered w-full mb-2"
                    />
                    <button
                        onClick={handleAddTask}
                        className="btn bg-primary text-white w-full"
                    >
                        Add Task
                    </button>
                </div>

                {/* Drag & Drop Context */}
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {CATEGORIES.map((category) => {
                            const columnTasks = getTasksByCategory(category);

                            return (
                                <div
                                    key={category}
                                    className="bg-white dark:bg-darkCardBackground rounded shadow p-2"
                                >
                                    <h2 className="text-xl font-bold mb-2 text-center text-lightText dark:text-darkText">
                                        {category}
                                    </h2>
                                    <Droppable droppableId={category} isDropDisabled={false}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="min-h-[200px]"
                                            >
                                                {columnTasks.map((task, index) => (
                                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                className="bg-base-300 dark:bg-gray-700 p-3 mb-2 rounded shadow-sm"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                {/* Task Title */}
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <input
                                                                        type="text"
                                                                        className="text-md font-semibold bg-transparent border-b border-dashed border-gray-400 w-full mr-2 text-lightText dark:text-darkText"
                                                                        defaultValue={task.title}
                                                                        onBlur={(e) =>
                                                                            handleEditTask(task._id, e.target.value, task.description)
                                                                        }
                                                                    />
                                                                    <button
                                                                        onClick={() => handleDeleteTask(task._id)}
                                                                        className="btn btn-xs btn-error"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                                {/* Task Description */}
                                                                <textarea
                                                                    className="text-sm bg-transparent border-b border-dashed border-gray-300 w-full text-lightText dark:text-darkText"
                                                                    defaultValue={task.description}
                                                                    onBlur={(e) =>
                                                                        handleEditTask(task._id, task.title, e.target.value)
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            );
                        })}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Tasks;
