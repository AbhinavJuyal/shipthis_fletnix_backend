import app from "@/server";
// initializing prisma client
import "@/db";

const server = app.listen(8080, () => {
  console.log("app is running on port 8080");
});

const onCloseSignal = () => {
  console.log("sigint received, shutting down");
  server.close(() => {
    console.log("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
