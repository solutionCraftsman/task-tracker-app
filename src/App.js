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
    // const addTask = (task) => {
    const addTask = async (task) => {
        //console.log(task)
        /*const id = Math.floor(Math.random() * 10000) +1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])*/

        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(task)
        })

        console.log(res)

        const data = await res.json() //you always await a promise

        console.log(data)

        setTasks([...tasks, data])
    }

    // Delete Task
    // const deleteTask = (id) => {
    const deleteTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })
        console.log(res)
        console.log(await res.json())
        //if res.status === 200, then setTasks() ... filter ...
        //console.log('delete', id)
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

        /*setTasks(tasks.map
            (task => task.id === id ?
                { ...task, reminder: !task.reminder} :
                task
            )
        )*/

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
                {/*<Header title='Hello' />*/}
                <Header onAddBtnClick={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
                {/*{showAddTask && <AddTask onAdd={addTask} />}*/}
                {/*<Tasks tasks={tasks} onDelete={deleteTask}*/}
                {/*onToggle={toggleReminder}/>*/}
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

//Class based component
/*import React from 'react'
class App extends React.Component {
    render() {
        return (
            //<h1>Hello from a class</h1>
            <div className="container">
                <Header />
            </div>
        )
    }
}*/

export default App;
