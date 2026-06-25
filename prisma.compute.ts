import { defineComputeConfig } from "@prisma/compute-sdk/config";

export default defineComputeConfig({
  app: {
    name: "preorder-manager",
    framework: "nextjs",
    env: ".env",
  },
});
