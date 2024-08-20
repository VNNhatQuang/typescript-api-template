import app from "./app";


// Default host and port
const PORT = process.env.PORT || 3000;
const HOST_NAME = process.env.HOST_NAME || "localhost";


// App running
app.listen(PORT, () => {
    console.log(`API is running:\t http://${HOST_NAME}:${PORT}/api-docs`);
});
