# Rate Limiting and Caching

This project is a demonstration of implementing robust rate limiting strategies in a Node.js REST API. Rate limiting is essential for protecting APIs from abuse, ensuring fair usage, and maintaining performance. By leveraging both the **Token Bucket** and **Leaky Bucket** algorithms, this application provides flexible options for controlling request rates per user or client.

The backend is built with **TypeScript** and **Express.js**, using **MongoDB** to persist user and rate limit data, and **Redis** for fast, in-memory tracking of request counts and state. The entire application is containerized with a **Dockerfile**, making it easy to build and deploy in any environment.

## Routing Details

The API exposes several endpoints, all protected by rate limiting middleware:

- `GET /` — Simple testing get request.
- `GET /token-bucket` — Fetch protected data from mongodb (rate limited with token bucket and redis).
- `GET /leaky-bucket` — Fetch protected data from mongodb (rate limited with leaky bucket).

You can configure which rate limiting algorithm (Token Bucket or Leaky Bucket) is applied to each route via middleware settings in the codebase.
