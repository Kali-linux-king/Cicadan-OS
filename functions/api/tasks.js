// functions/api/tasks.js
export async function onRequest(context) {
  // Get the request URL to see what task they are asking for
  const url = new URL(context.request.url);
  const taskId = url.searchParams.get("id"); 

  // If no ID is provided, return an error
  if (!taskId) {
    return new Response(JSON.stringify({ error: "Please provide a task id. Example: /api/tasks?id=1" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Construct the path to the static JSON file inside the public folder
    const filePath = `/task/task${taskId}.json`;

    // Fetch the file from the same domain
    const response = await context.env.ASSETS.fetch(new URL(filePath, url.origin));

    // If the file doesn't exist (e.g., they asked for task 99), return a 404
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Return the JSON file with proper headers
    return new Response(response.body, {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
