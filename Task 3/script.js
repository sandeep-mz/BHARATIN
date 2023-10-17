navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        const localVideo = document.getElementById("local-video");
        localVideo.srcObject = stream;
    })
    .catch((error) => {
        console.error("Error accessing webcam:", error);
    });

    document.addEventListener("DOMContentLoaded", function () {
    
        const chatMessages = document.getElementById("chat-messages");
        const chatInput = document.getElementById("chat-input");
        const sendButton = document.getElementById("send-button");
    
        // Function to add a new chat message
        function addMessage(message) {
            const messageElement = document.createElement("div");
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
        }
    
        // Send chat message when the Send button is clicked
        sendButton.addEventListener("click", function () {
            const message = chatInput.value;
            if (message) {
                addMessage("You: " + message);
                chatInput.value = ""; // Clear the input field
            }
        });
    });
    document.addEventListener("DOMContentLoaded", function () {
        const localVideo = document.getElementById("local-video");
        const startRecordButton = document.getElementById("start-record");
        const stopRecordButton = document.getElementById("stop-record");
        const downloadLink = document.getElementById("download-link");
    
        let mediaRecorder;
        let recordedChunks = [];
    
        // Get access to the user's webcam and microphone
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(function (stream) {
                localVideo.srcObject = stream;
    
                // Initialize the MediaRecorder with the video stream
                mediaRecorder = new MediaRecorder(stream);
    
                // Add data available event handler
                mediaRecorder.ondataavailable = function (event) {
                    if (event.data.size > 0) {
                        recordedChunks.push(event.data);
                    }
                };
    
                // Add stop event handler
                mediaRecorder.onstop = function () {
                    const blob = new Blob(recordedChunks, { type: "video/webm" });
                    recordedChunks = [];
    
                    // Enable the download link and set the recorded video data
                    downloadLink.href = window.URL.createObjectURL(blob);
                    downloadLink.style.display = "block";
                    downloadLink.download = "recorded-video.webm";
                };
            })
            .catch(function (error) {
                console.error("Error accessing webcam:", error);
            });
    
        // Start recording
        startRecordButton.addEventListener("click", function () {
            mediaRecorder.start();
            startRecordButton.disabled = true;
            stopRecordButton.disabled = false;
        });
    
        // Stop recording
        stopRecordButton.addEventListener("click", function () {
            mediaRecorder.stop();
            startRecordButton.disabled = false;
            stopRecordButton.disabled = true;
        });
    });
    