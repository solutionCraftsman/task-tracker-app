//import { useState } from 'react'
import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {

    return (
        //setTasks([...tasks, {}])
        <>
            {/*{tasks.map(
                task => (
                    <h3 key={task.id}>
                        {task.text}
                    </h3>
                )
            )}*/}
            {
                tasks.length > 0 ? (
                    tasks.map(
                        // task => <Task key={task.id} task={task} onDelete={onDelete}
                        (task, index) => <Task key={index} task={task} onDelete={onDelete}
                        onToggle={onToggle}/>
                    )
                ) : (
                    'No Tasks to show'
                )
            }
        </>
    )
}

export default Tasks
