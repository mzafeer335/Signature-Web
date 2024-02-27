document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("signatureCanvas");
    const context = canvas.getContext("2d");
    let isDrawing = false;

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    document.getElementById("clearButton").addEventListener("click", clearSignature);
    document.getElementById("downloadButton").addEventListener("click", downloadSignature);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;

        context.lineWidth = 2;
        context.lineCap = "round";
        context.strokeStyle = "#000";

        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function stopDrawing() {
        isDrawing = false;
        context.beginPath();
    }

    function clearSignature() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function downloadSignature() {
        const dataUrl = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "signature.png";
        link.click();
    }
});
