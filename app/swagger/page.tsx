// app/swagger/page.tsx
"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./custom-swagger.css";

const swaggerUrl = "/api/swagger/swagger.json";

export default function SwaggerPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Documentación de la API</h1>

      <SwaggerUI
        url={swaggerUrl}
        withCredentials={true}
        persistAuthorization={true}
        docExpansion="none"
        requestInterceptor={(req) => {
          req.withCredentials = true;

          // Si querés seguir usando Bearer opcional:
          const token = localStorage.getItem("token");
          if (token) {
            req.headers["Authorization"] = `Bearer ${token}`;
          }

          return req;
        }}
        onComplete={(ui) => {
          const token = localStorage.getItem("token");
          if (token) ui.preauthorizeApiKey("bearerAuth", token);
        }}
      />
    </div>
  );
}
