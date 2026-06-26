console.log("this is from client");

let backendData = fetch("http://localhost:3000/tools")

backendData
.then((res) => res.json())
.then(data => console.log(data))
.catch((err) => console.log(err))
.finally(() => console.log("this is from the finally"));