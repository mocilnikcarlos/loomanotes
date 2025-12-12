import {
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

import { registry } from "./registry";

import "./paths";

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

registry.registerComponent("securitySchemes", "cookieAuth", {
  type: "apiKey",
  in: "cookie",
  name: "sb-access-token",
});

export function generateOpenAPI() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Next.js App Router API",
      version: "1.0.0",
      description: "Documentación oficial del backend (App Router).",
    },
    servers: [{ url: "http://localhost:3000/api" }],
    security: [{ bearerAuth: [] }, { cookieAuth: [] }],
  });
}

export const openApiDocument = generateOpenAPI();
