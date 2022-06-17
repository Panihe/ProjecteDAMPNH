<?php
 
    // Importing DBConfig.php file.
    include 'DBConfig.php';

    // Creating connection.
    $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

    if ($con->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      //echo "Connected successfully";

    // Getting the received JSON into $json variable.
    $json = file_get_contents('php://input');

    // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);

    // Populate name from JSON $obj array and store into $client.
    $Email = $obj['Email'];

	//$Email = 'aleix@aviva.com';

    // Creating SQL query and insert the record into MySQL database table.
	//$sql = "SELECT PASSWORD FROM `clients` WHERE Email=\'aleix@aviva.com\'";
    $sql = "Select * FROM users WHERE Email = '$Email'";

    $response = $con->query($sql);
    $data = $response->fetch_assoc();

    echo(json_encode( $data) );

    return $data;

    mysqli_close($con);
?>