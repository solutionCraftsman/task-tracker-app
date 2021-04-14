import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

function App() {

    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([

    ])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        //fetchTasks()
        getTasks()
    }, [])

    // Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        //console.log(data)
        return data
    }

    // Fetch Task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        //console.log(data)
        return data
    }

    // Add Task
    const addTask = async (task) => {

        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(task)
        })

        console.log(res)

        const data = await res.json()

        console.log(data)

        setTasks([...tasks, data])
    }

    // Delete Task
    const deleteTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })
        console.log(res)
        console.log(await res.json())
        setTasks(tasks.filter
            (task => task.id !== id)
        )
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        //console.log(id)

        const taskToToggle = await fetchTask(id)
        const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedTask)
        })

        const data = await res.json()

        setTasks(tasks.map
            (task => task.id === id ?
                { ...task, reminder: data.reminder} :
                task
            )
        )
    }

    return (
        <Router>
            <div className="container">
                <Header onAddBtnClick={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
                <Route path='/' exact render={
                    (props) => (
                        <>
                            {showAddTask && <AddTask onAdd={addTask} />}
                            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
                        </>
                )} />
                <Route path='/about' component={About} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
