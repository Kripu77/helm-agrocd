import Express, { Request, Response } from "express";
const app = Express();
const PORT: number = 8000;

//get data

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    sucess: true,
    data: "Live Synced on Sun 10 September",
  });
});

//catch all routes
app.use("*", (req: Request, res: Response) => {
  return res.status(400).send("Invalid routes, please try later");
});

//listen for incomming requests
app.listen(PORT, () => {
  console.log("Server running");
});
