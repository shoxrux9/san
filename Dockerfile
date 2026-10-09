FROM node:24-alpine
WORKDIR /app
COPY . .
RUN mkdir -p /app/var && chown -R node:node /app
USER node
ENV HOST=0.0.0.0 PORT=3000 DATA_DIR=/app/var
VOLUME ["/app/var"]
EXPOSE 3000
CMD ["node", "server.mjs"]
