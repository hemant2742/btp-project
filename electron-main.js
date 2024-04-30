const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require('axios');
const localServerApp = express();
const PORT = 8088;
const startLocalServer = (done) => {
  localServerApp.use(express.json({ limit: "100mb" }));
  localServerApp.use(cors());
  localServerApp.use(express.static('./build/'));
  localServerApp.get("/api/data", async (req, res) => {

    try {
      const response = await fetch("http://localhost:5000");

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      res.status(500).json({ error: "Failed to fetch data from backend" });
    }
  });

  localServerApp.listen(PORT, async () => {
    console.log("Server Started on PORT ", PORT);
    done();
  });
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:" + PORT);

}

app.whenReady().then(() => {
  startLocalServer(createWindow);

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

