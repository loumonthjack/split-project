import { Request, Response, NextFunction } from "express";
import { getFeature } from "./split";

type Event = "page_loaded" | "test_button_clicked";

export function trackEvent(eventName: Event): NextFunction {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = getFeature.showDashboard(req.body.name);
        if (!data) {
            getFeature.eventTracker(eventName, null);
            next();
        }
        getFeature.eventTracker(eventName, req.body.name);
        next();
    }
}