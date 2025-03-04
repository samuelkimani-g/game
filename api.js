// fetch("https://jsonplaceholder.org/posts")
// .then(response => response.json())
// .then(json => console.log(json))
// .catch(error => console.log(error));

fetch("https://jsonplaceholder.typicode.com/todos/2")
 method;


fetch("https://jsonplaceholder.typicode.com/todos/2"),
 method; 'POST',
 Headers: {
    'content-type': 'application/json'
 },
 body: JSON.stringify({
    title: 'New Todo',
    completed: true,
    userId: 2
 })

.then(response => response.json())
.then(json => console.log(json))
.catch(error => console.log(error));