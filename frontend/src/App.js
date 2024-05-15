import React, { Component } from 'react';
import './App.css';
import CustomModal from './components/Modal';


const taskList = [
  {
    id: 1,
    title: "Read Book",
    description: "Read a book for at least 30 minutes",
    completed: false
  },
  {
    id: 2,
    title: "Play Guitar",
    description: "Play guitar for at least 30 minutes",
    completed: true
  },
  {
    id: 3,
    title: "Walk",
    description: "Take a walk around the neighbourhood",
    completed: false
  },
  
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      CustomModal:false,
      viewCompleted:false,
      taskList: taskList,
      activeItem: {
        title : "",
        description : "",
        completed : false,
      },
    };
  }

  toggle = () => {
    this.setState({ CustomModal : !this.state.CustomModal });
  };

  handleSubmit = item => {
    this.toggle();
    alert('Saved!' + JSON.stringify(item));
  };

  handleDelete = item => {
    alert('Deleted' + JSON.stringify(item));
  };

  createItem = () => {
    const item = { title: "", CustomModal: !this.state.CustomModal };
    this.setState({ activeItem: item, CustomModal: !this.state.CustomModal });
  };

  editItem = item => {
    this.setState({ activeItem: item, CustomModal: !this.state.CustomModal });
  }







  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
         >
        Completed
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
         >
        Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );

    return newItems.map(item => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className={`todo-title me-2 ${this.state.viewCompleted ? "completed-todo" : ""}`} title={item.title}>
          {item.title}
        </span>
        <span>
          <button className="btn btn-info me-2">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-white text-uppercase text-center my-4">Task Manager</h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button className="btn btn-warning">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-3 mb-2 bg-info text-white text-center">Copyright 2024 &copy; All Rights Reserved</footer>
        {this.state.CustomModal ? (
          <CustomModal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit} />
        ) : null}
      </main>
    );
  }
}

export default App;

