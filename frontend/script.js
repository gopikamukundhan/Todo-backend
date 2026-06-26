console.log("this is from client");

let backendData = fetch("https://todo-backend-q73v.onrender.com/tools")

backendData
.then((res) => res.json())
.then(data => console.log(data))
.catch((err) => console.log(err))
.finally(() => console.log("this is from the finally"));