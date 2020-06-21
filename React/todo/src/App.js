import React from 'react';
import TodoItem from "./components/TodoItem";
import todoData from "./todoData";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: todoData,
      completed: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id) {
    console.log(id);
    this.setState( (prevState) => {
      //get the previous state of the all the checkboxes and toggle the "completed" property of the clicked checkbox
      const updatedTodos = prevState.todos.map( (todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
      return {
        todos: updatedTodos
      }
    })
  }

  render() {

    const todoItems = this.state.todos.map( (todo) => {
      return (
        <TodoItem key={todo.id} item={todo} handleChange={this.handleChange}/>
      )
    })

    return (
      <div className="todo-list">
        {todoItems}
      </div>
    );
  }
}

export default App;
