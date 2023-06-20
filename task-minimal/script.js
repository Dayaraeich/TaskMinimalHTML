$(document).ready(function() {

    loadTasks();

    $('#add-task-btn').click(function() {
        var taskInput = $('#task-input');
        var taskTitle = taskInput.val();

        if (taskTitle.trim() !== '') {
            addTask(taskTitle);
            taskInput.val('');
        }
    });

    $('#task-input').keypress(function(event) {
        if (event.which === 13) {
            event.preventDefault();
            $('#add-task-btn').click();
        }
    });

    $(document).on('click', '.task-item input[type="checkbox"]', function() {
        var taskItem = $(this).closest('.task-item');
        var taskId = taskItem.data('task-id');
        var completed = $(this).is(':checked');

        updateTaskStatus(taskId, completed);
    });

    $(document).on('click', '.task-item .delete-btn', function() {
        var taskItem = $(this).closest('.task-item');
        var taskId = taskItem.data('task-id');

        deleteTask(taskId);
    });

    $(document).on('click', '.task-item .edit-btn', function() {
        var taskItem = $(this).closest('.task-item');
        var taskId = taskItem.data('task-id');
        var taskTitle = taskItem.find('.task-title').text();

        var newTaskTitle = prompt('Editar tarefa', taskTitle);
        if (newTaskTitle !== null && newTaskTitle.trim() !== '') {
            updateTaskTitle(taskId, newTaskTitle);
        }
    });

    function loadTasks() {
        $.ajax({
            url: 'get_tasks.php',
            type: 'GET',
            success: function(response) {
                $('#task-list').html(response);
            }
        });
    }

    function addTask(taskTitle) {
        $.ajax({
            url: 'add_task.php',
            type: 'POST',
            data: { title: taskTitle },
            success: function(response) {
                loadTasks();
            }
        });
    }

    function updateTaskStatus(taskId, completed) {
        $.ajax({
            url: 'update_task_status.php',
            type: 'POST',
            data: { id: taskId, completed: completed ? 1 : 0 },
            success: function(response) {
                loadTasks();
            }
        });
    }

    function deleteTask(taskId) {
        $.ajax({
            url: 'delete_task.php',
            type: 'POST',
            data: { id: taskId },
            success: function(response) {
                loadTasks();
            }
        });
    }

    function updateTaskTitle(taskId, newTaskTitle) {
        $.ajax({
            url: 'update_task_title.php',
            type: 'POST',
            data: { id: taskId, title: newTaskTitle },
            success: function(response) {
                loadTasks();
            }
        });
    }
});
