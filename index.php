<?php //session_start();

// $_SESSION['name'] = "";
// $_SESSION['favcolor'] = "green";
// print "Session color set as " . $_SESSION['favcolor'];
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Chatroom</title>
        <link rel="stylesheet" type="text/css" href="assets/styles.css" />
        <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
        <script src="http://your-io-server/socket.io/socket.io.js"></script>

    </head>
    <body>
        <div id="window" style="width: 100%; max-width: 100%;">
            <div id="output" style="width: 100%; max-width: 100%; height: 300px; overflow: scroll; border: 1px solid #000">

            </div>

            <input type="text" id="name" style="width: 200px; display:block;" placeholder="name" />
            <div contentEditable="true" data-text="Enter text here"s rows="1" type="text" id="chat-input" style="width: inherit;"></div>

            <!-- <button class="clear">Clear</button> -->

            <div class="emojiContainer">
                <img class="emoji" src="./assets/Images/frown.png" alt="" />
                <img class="emoji" src="./assets/Images/smile.png" alt="" />
            </div>
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <!-- Run Main JS -->
        <script src="assets/js/main.js"></script>
    </body>
</html>
