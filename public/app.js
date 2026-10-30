// public/app.js

// 1. Load the list of tasks and build the menu
async function loadTaskMenu() {
  const taskListContainer = document.getElementById('task-list');
  if (!taskListContainer) return;

  try {
    // Fetch the index.json we discussed earlier
    const response = await fetch('/task/index.json');
    if (!response.ok) throw new Error("Could not load task index");
    
    const tasks = await response.json();
    taskListContainer.innerHTML = ''; // Clear loading text

    // Loop through the tasks and create a button for each
    tasks.forEach(task => {
      const btn = document.createElement('button');
      btn.className = 'task-btn';
      btn.textContent = `> ${task.title}`;
      btn.onclick = () => loadTaskDetails(task.id);
      taskListContainer.appendChild(btn);
    });

  } catch (error) {
    console.error("Error loading menu:", error);
    taskListContainer.innerHTML = '<p style="color:red;">Error loading task list.</p>';
  }
}

// 2. Fetch a specific task by ID and display it
async function loadTaskDetails(taskId) {
  const contentArea = document.getElementById('task-content');
  if (!contentArea) return;

  contentArea.innerHTML = '<p>Decrypting task data...</p>';

  try {
    // Call your Cloudflare Function
    const response = await fetch(`/api/tasks?id=${taskId}`);
    
    if (!response.ok) {
      if (response.status === 404) throw new Error("Task not found.");
      throw new Error("Server error.");
    }

    const data = await response.json();

    // Update the UI with the task data
    contentArea.innerHTML = `
      <h2>${data.title}</h2>
      <p><strong>Status:</strong> ${data.status}</p>
      <p>${data.description}</p>
      <hr>
      <small>Task ID: ${data.id}</small>
    `;

  } catch (error) {
    console.error("Error loading task:", error);
    contentArea.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

// 3. Run the menu loader when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadTaskMenu();
});
