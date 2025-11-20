FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy server code
COPY server.js ./

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=60s --retries=3 \
  CMD node -e "fetch('http://localhost:3001/health').then(r=>r.json()).then(d=>{if(!d.configured)throw new Error('Not configured')})" || exit 1

# Start server
CMD ["node", "server.js"]





