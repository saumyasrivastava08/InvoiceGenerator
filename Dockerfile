FROM node:14

# Install dependencies
RUN apt-get update && apt-get install -y \
  wget \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libxshmfence1 \
  libxtst6 \
  libxv1 \
  libxv1 \
  lsb-release \
  xdg-utils \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Install Puppeteer
RUN npm install puppeteer

# Add your application files
COPY . /app
WORKDIR /app

# Run Puppeteer with --no-sandbox
CMD ["node", "your-script.js", "--no-sandbox"]
