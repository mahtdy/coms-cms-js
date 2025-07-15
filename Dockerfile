# FROM node:18


# USER root


# ENV NODE_ENV=production

# RUN mkdir -p /var/www/cms-video
# WORKDIR /var/www/cms-video

# COPY ["package.json", "package-lock.json*", "./"]

# RUN apt-get update && apt-get install -y --no-install-recommends \
# 			graphicsmagick imagemagick ffmpeg \
# 		    && rm -rf /var/lib/apt/lists/*


# COPY . /var/www/cms-video

# RUN npm install --save
# # RUN npm rebuild
# RUN npm install typescript --save

# RUN npm audit fix

# RUN npm install --only=dev


# RUN npm run build-ts



# CMD [ "node", "build/app.js"]