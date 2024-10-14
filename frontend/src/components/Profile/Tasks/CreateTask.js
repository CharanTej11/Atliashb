import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(
      '/tasks/create',
      { title, description, priority },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
