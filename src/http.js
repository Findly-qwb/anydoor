const http = require("http");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");
const conf = require("./config/defaultConfig");
const source = fs.readFileSync(
  path.join(__dirname, "./template/dir.html"),
  "utf-8"
);
const template = Handlebars.compile(source.toString());
const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url); // 获取执行路径

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not find");
      return;
    }
    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      fs.createReadStream(filePath).pipe(res);
    } else if (stats.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        const data = {
          title: path.basename,
          dir: path.relative(conf.root, filePath),
          files
        };
        res.end(template(data));
      });
    }
  });
});

server.listen(conf.post, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.post}`;
  console.info(`Server start at ${chalk.green(addr)}`);
});
