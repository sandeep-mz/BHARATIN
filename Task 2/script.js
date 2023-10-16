document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const assigneeInput = document.getElementById("assignee");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const completedTaskList = document.getElementById("completed-task-list"); // Add a new list for completed tasks

    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        const assignee = assigneeInput.value.trim();

        if (taskText && assignee) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                Task: ${taskText}<br>
                Assignee: ${assignee}<br>
                <button class="delete">Delete</button>
                <button class="done">Task Done</button>
            `;
            taskList.appendChild(listItem);
            taskInput.value = "";
            assigneeInput.value = "";

            const deleteButton = listItem.querySelector("button.delete");
            deleteButton.addEventListener("click", function() {
                listItem.remove();
            });

            const doneButton = listItem.querySelector("button.done");
            doneButton.addEventListener("click", function() {
                // Change the style of the completed task
                listItem.style.textDecoration = "line-through";
                listItem.style.color = "green";
                
                // Move the completed task to the completed task list
                completedTaskList.appendChild(listItem);

                // Remove the "Task Done" and "Delete" buttons
                listItem.removeChild(doneButton);
                listItem.removeChild(deleteButton);
            });
        }
    });
});
