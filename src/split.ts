import dotenv from "dotenv";
import type { SplitKey } from "@splitsoftware/splitio/types/splitio";
import { SplitFactory } from "@splitsoftware/splitio";
import { User, getUser } from "./users";
dotenv.config();

interface Features {
  [key: string]: string;
}

class FeatureToggle {
  SPLIT_TRAFFIC_TYPE = "user";
  SPLIT_ENABLED = "on";
  factory: SplitIO.ISDK = SplitFactory({
    core: {
      authorizationKey: process.env.SPLIT_AUTHORIZATION_KEY,
      trafficType: this.SPLIT_TRAFFIC_TYPE,
      key: process.env.SPLIT_CUSTOMER_KEY,
    },
    debug: true,
    startup: {
      readyTimeout: 2, // 2 sec
    },
  });
  client: SplitIO.IClient;
  logger = this.factory.Logger;
  feature: Features = { demo: "Test" };
  splitUser: SplitKey = "Test_User";
  constructor() {
    this.client = this.factory.client();
    this.logger.enable();
  }
  showDashboard(username: User["name"], age: User["age"]): Boolean {
    const user = getUser(username);
    if (!user) return false;
    const showFeature = this.client.getTreatment(
      this.splitUser,
      this.feature.demo,
      { name: user.name, role: user.role, age: user.age }
    );
    return showFeature == this.SPLIT_ENABLED;
  }
  eventTracker(eventName: string, username: string | null, age: number) {
    const user = getUser(username);
    if (!user) {
      return this.client.track(
        process.env.SPLIT_CUSTOMER_KEY,
        this.SPLIT_TRAFFIC_TYPE,
        eventName,
        1,
        {
          name: username || "anonymous",
          age: age || 15,
        }
      );
    }
    return this.client.track(
      process.env.SPLIT_CUSTOMER_KEY,
      this.SPLIT_TRAFFIC_TYPE,
      eventName,
      user.id,
      {
        name: user.name,
        role: user.role,
        age: user.age,
      }
    );
  }
}
export const getFeature = new FeatureToggle();
