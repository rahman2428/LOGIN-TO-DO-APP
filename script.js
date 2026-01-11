import { auth } from "./Firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- 1. Authentication Logic ---

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If no user, redirect to login
    window.location.href = "rahman-login.html";
  } else {
    console.log("User is logged in:", user.email);
    // Optional: Load user specific tasks here if you connect Firestore later
  }
});

// Logout functionality
const logoutBtn = document.getElementById('logout-btn');
if(logoutBtn){
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            alert("Logged out successfully");
            window.location.href = "rahman-login.html";
        }).catch((error) => {
            console.error("Logout error", error);
        });
    });
}


// --- 2. To-Do List Logic (Your existing code) ---

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(task) {
  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');
  li.setAttribute('data-id', task.id);

  // Checkbox
  const checkbox = document.createElement('div');
  checkbox.classList.add('checkbox');
  li.appendChild(checkbox);

  // Task text
  const taskText = document.createElement('div');
  taskText.classList.add('task-text');
  taskText.textContent = task.text;
  taskText.setAttribute('contenteditable', 'false');
  li.appendChild(taskText);

  // Actions
  const actions = document.createElement('div');
  actions.classList.add('actions');

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.innerHTML = '✏️';
  actions.appendChild(editBtn);

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';
  actions.appendChild(deleteBtn);

  li.appendChild(actions);

  // Events
  checkbox.addEventListener('click', () => toggleComplete(task.id, li));
  
  editBtn.addEventListener('click', () => {
    if (taskText.getAttribute('contenteditable') === 'false') {
        taskText.setAttribute('contenteditable', 'true');
        taskText.focus();
        editBtn.innerHTML = '💾';
    } else {
        taskText.setAttribute('contenteditable', 'false');
        editBtn.innerHTML = '✏️';
        updateTaskText(task.id, taskText.textContent.trim());
    }
  });

  deleteBtn.addEventListener('click', () => removeTask(task.id, li));

  return li;
}

function toggleComplete(id, li) {
  const task = tasks.find(t => t.id === id);
  if (task) {
      task.completed = !task.completed;
      li.classList.toggle('completed');
      saveTasks();
  }
}

function updateTaskText(id, newText) {
  const task = tasks.find(t => t.id === id);
  if (task && newText !== '') {
      task.text = newText;
      saveTasks();
  }
}

function removeTask(id, li) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  li.remove();
}

function addTask(text) {
  if (text.trim() === '') return;
  const newTask = {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  list.appendChild(createTaskElement(newTask));
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach(task => list.appendChild(createTaskElement(task)));
}

if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      addTask(input.value);
      input.value = '';
    });
}

// Initial render
renderTasks();