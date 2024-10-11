<?php
$country = $_SERVER["HTTP_CF_IPCOUNTRY"];
$url = '';

switch ($country) {
    case 'IN': // India
        $url = 'https://example.com/in';
        break;

    default:
        $url = 'https://example.com/default';
        break;
}

header("Location: $url");
exit;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location-Based Redirect</title>
</head>
<body>
    <!-- This content will only load if the PHP script above doesn't trigger a redirect -->
    <h1>Welcome to our website</h1>
</body>
</html>
