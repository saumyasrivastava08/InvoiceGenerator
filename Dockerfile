# Use an official Node.js runtime as a parent image
FROM node:14

# Create and set the working directory
WORKDIR /app

# Install latest Chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai, and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install puppeteer so it's available in the container.
RUN npm init -y && \
    npm install puppeteer \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
    && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app/node_modules

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Change ownership to pptruser for the rest of the application files
RUN chown -R pptruser:pptruser /app

# Switch to the pptruser user
USER pptruser

# Set environment variables if needed
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Expose the port the app runs on
EXPOSE 3000

# Run the script
CMD ["node", "src/index.js"]
