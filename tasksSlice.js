import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        activeTask: null
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                title: action.payload,
                timeSpent: 0,
                status: 'active'
            });
        },
        setActiveTask: (state, action) => {
            state.activeTask = action.payload;
        },
        incrementTimeSpent: (state) => {
            if (state.activeTask) {
                const task = state.tasks.find(task => task.id === state.activeTask);
                if (task) {
                    task.timeSpent += 1;
                }
            }
        },
        completeTask: (state) => {
            const task = state.tasks.find(task => task.id === state.activeTask);
            if (task) {
                task.status = 'completed'; 
            }
            state.activeTask = null;
        },
        pauseTask: (state) => {
            const task = state.tasks.find(task => task.id === state.activeTask);
            if (task) {
                task.status = 'paused'; 
            }
        },
        resumeTask: (state) => {
            const task = state.tasks.find(task => task.id === state.activeTask);
            if (task) {
                task.status = 'active'; 
            }
        }
    }
});

export const {
    addTask,
    setActiveTask,
    incrementTimeSpent,
    completeTask,
    pauseTask,
    resumeTask
} = tasksSlice.actions;

export default tasksSlice.reducer;
