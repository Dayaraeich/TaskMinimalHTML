<?php

$host = 'localhost';
$username = 'root';
$password = '832586';
$database = 'gerenciador_tarefas_tm';

$connection = mysqli_connect($host, $username, $password, $database);

if (!$connection) {
    die('Erro de conexão com o banco de dados: ' . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $title = $_POST['title'];

    $query = "UPDATE tasks SET title = '$title' WHERE id = $id";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('Erro ao atualizar o título da tarefa no banco de dados: ' . mysqli_error($connection));
    }

}

mysqli_close($connection);
?>
