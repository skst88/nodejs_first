const http = require("http");
const path = require("path");
const fs = require("fs");
const PORT = 8000;

const data = [
  {
    id: 1,
    name: "Alex",
  },
  {
    id: 2,
    name: "Pasha",
  },
  {
    id: 3,
    name: "Misha",
  },
];

// ! сервер отвечает этой колбэк ф.
const server = http.createServer((req, res) => {
  //   res.setHeader("Content-type", "text/plain");
  //   res.statusCode = 201;
  //   res.write("This is content from server");
  //   res.writeHead(404, {
  //     "Content-Type": "text/html",
  //     Authorization: "token",
  //   });
  //   res.write("<body><p>Lesson 4</p></body>");
  //   res.write('<a href="https://www.makers.kg" target="_blank">Makers.kg</a>');
  //   res.write("<h1>Hello from Dayana!</h1>");
  //   console.log(req.url);
  //   res.setHeader("Content-Type", "application/json");
  //   res.write(JSON.stringify(data));
  //   console.log(req);
  //   res.write(JSON.stringify(req));
  //   res.end();

  switch (req.url) {
    case "/":
      if (req.method === "DELETE") {
        res.write("<b>Delete method</b>");
        res.end();
      } else {
        res.write("<h1>Main page</h1>");
        res.end();
      }
      break;
    case "/contacts":
      res.write("<h1>Contact page</h1>");
      res.end();
      break;
    case "/page":
      res.setHeader("Content-Type", "text/html");
      fs.readFile(path.resolve("index.html"), (err, data) => {
        if (err) {
          res.write(err);
          throw err;
        }
        res.write(data);
        res.end();
      });
      break;
    default:
      res.statusCode = 404;
      res.write("<h1>404 page not found</h1>");
      res.end();
  }
});
server;

// ! запускает и слушает сервер
server.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
