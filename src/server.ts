import dotenv from "dotenv";
import express, { Request, Response } from "express";

import { getUser } from "./users";
import { getFeature } from "./split";
import { homePage, htmlPage } from "./html";
// import { trackEvent } from "./middleware";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send(homePage);
})

app.post("/toggle", (req: Request, res: Response) => {
    const data = getFeature.showDashboard(req.body.name);
    if (!data) {
        res.send(homePage);
    }
    const dashboard = htmlPage(getUser(req.body.name));
    res.send(dashboard);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
