<?php

$host = 'localhost';
$username = 'root'; 
$password = '832586';
$database = 'gerenciador_tarefas_tm'; 

$connection = mysqli_connect($host, $username, $password, $database);

if (!$connection) {
    die('Erro de conexão com o banco de dados: ' . mysqli_connect_error());
}

$query = "SELECT id, title, completed FROM tasks";
$result = mysqli_query($connection, $query);

if (!$result) {
    die('Erro na consulta do banco de dados: ' . mysqli_error($connection));
}

$tasksHTML = '';
while ($row = mysqli_fetch_assoc($result)) {
    $taskId = $row['id'];
    $taskTitle = $row['title'];
    $completed = $row['completed'];

    $checked = $completed ? 'checked' : '';

    $tasksHTML .= "<li class='task-item' data-task-id='$taskId'>
                        <input type='checkbox' $checked>
                        <span class='task-title'>$taskTitle</span>
                        <div class='task-actions'>
                            <button class='delete-btn'>Excluir</button>
                        </div>
                    </li>";
}

echo $tasksHTML;

mysqli_close($connection);
?>
