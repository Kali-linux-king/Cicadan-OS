// public/app.js

// 1. Fetch the list of tasks and populate the Ledger
async function loadLedgerTasks() {
  const ledgerContainer = document.querySelector('.ledger-container');
  if (!ledgerContainer) return;

  try {
    const res = await fetch('/task/index.json'); // Ensure this file exists!
    const tasks = await res.json();

    // Clear the hardcoded HTML (we will rebuild it)
    ledgerContainer.innerHTML = '<div class="ledger-header">[CLASSIFIED ARCHIVE // AUTHORIZED EYES ONLY]</div>';

    tasks.forEach((task, index) => {
      const section = document.createElement('div');
      section.className = 'ledger-section';
      
      // If it's not the first task, obfuscate it initially
      if (index > 0) {
        section.classList.add('obfuscated-container');
        section.id = `task-${task.id}-section`;
      }

      section.innerHTML = `
        <div class="task-title">
          <span>TASK ${task.id.toString().padStart(2, '0')}: ${task.title}</span>
          <span class="status-tag ${index === 0 ? 'status-unlocked' : 'status-locked'}" id="task-${task.id}-status">
            ${index === 0 ? 'UNLOCKED' : 'LOCKED'}
          </span>
        </div>
        <p>${task.description}</p>
      `;

      // Add the gate box to the FIRST task only
      if (index === 0) {
        section.innerHTML += `
          <div class="gate-box">
            <div class="gate-label">Decrypt Key to Next Chapter</div>
            <div class="gate-input-row">
              <input type="text" class="gate-input" id="task-${task.id}-key-input" placeholder="Enter Key..." autocomplete="off">
              <button class="gate-btn" id="task-${task.id}-unlock-btn">DECRYPT</button>
            </div>
            <div id="gate-msg" style="font-size: 0.78rem; display: none;"></div>
          </div>
        `;
      }

      ledgerContainer.appendChild(section);
    });

    // Re-attach the unlock logic for Task 1
    attachTask1Logic();

  } catch (error) {
    console.error("Failed to load ledger:", error);
  }
}

// 2. Logic for unlocking the next task
function attachTask1Logic() {
  const btn = document.getElementById('task-1-unlock-btn');
  const input = document.getElementById('task-1-key-input');
  const gateMsg = document.getElementById('gate-msg');

  if (!btn) return;

  const checkKey = async () => {
    // In a real app, you would verify this via a Cloudflare Function
    // For now, we keep your hardcoded key: 0x14061994
    if (input.value.trim() === '0x14061994') {
      if(window.AudioEngine) window.AudioEngine.playSuccess();
      
      const task2Section = document.getElementById('task-2-section');
      if(task2Section) {
        task2Section.classList.add('unlocked');
        document.getElementById('task-2-status').textContent = 'UNLOCKED';
        document.getElementById('task-2-status').className = 'status-tag status-unlocked';
      }

      gateMsg.style.display = 'block';
      gateMsg.style.color = 'var(--term-green)';
      gateMsg.textContent = 'Decryption key verified. Chapter 02 unblurred.';
    } else {
      if(window.AudioEngine) window.AudioEngine.playError();
      gateMsg.style.display = 'block';
      gateMsg.style.color = 'var(--term-red)';
      gateMsg.textContent = 'Invalid Decryption Key. Access Denied.';
    }
  };

  btn.addEventListener('click', checkKey);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkKey(); });
}

// 3. Initialize the menu when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadLedgerTasks();
});
