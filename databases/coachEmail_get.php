
<?php
// Importing DBConfig.php file.
include 'DBConfig.php';

$json = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$obj = json_decode($json, true);

// Populate name from JSON $obj array and store into $client.
$coachCode = $obj['coachCode'];


$con = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);

if ($con->connect_error) {
    echo ("error");
    die("Connection failed: " . $con->connect_error);
}

// echo "Connected successfully </br>";


$sql = "SELECT 'Name', 'LastName', 'Email', 'Phone' FROM `users` where CoachCode = '$coachCode' AND Type = 1";
$result = mysqli_query($con, $sql) or die("Error in Selecting " . mysqli_error($connection));


$response = $con->query($sql);
$data = $response->fetch_assoc();
echo (json_encode($data));
return $data;

mysqli_close($con);


?>