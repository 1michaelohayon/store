import app from "./app";
import http from "http"
import config from "./utils/config";

const server = http.createServer(app)
const baseURL = (dir:string):string => `/api/${dir}`;

app.get(baseURL('ping'), (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

const PORT = config.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});