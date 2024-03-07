export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard"] }; // add all the pages that we want protected
// dashboard page will not be accessible when we are logged out
// matcher: ["/dashboard", "landing_page", "flight_preparation", "anomaly_detections" ]
