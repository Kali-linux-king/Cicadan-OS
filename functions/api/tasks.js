// functions/api/tasks.js
export async function onRequest(context) {
  // You can add logic here later to check if the user is logged in
  // or if the task is actually unlocked.

  const taskData = {
    "id": "task_01",
    "title": "The Morris Worm (1988)",
    "status": "UNLOCKED",
    "description": "Analyzing raw uncompiled ARPANET binaries..."
  };

  return new Response(JSON.stringify(taskData), {
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" 
    }
  });
}
