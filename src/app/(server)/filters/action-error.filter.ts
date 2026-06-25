import { ActionError } from "../dto";

export class ActionErrorFilter {
  static fromError(err: unknown, action = "Unknown action"): ActionError {
    // Handle all sorts of server action errors here

    // Unknown errors
    return {
      ok: false,
      action,
      message: "An unknown error occurred",
      statusCode: 500,
      timestamp: new Date().toISOString(),
    };
  }
}
