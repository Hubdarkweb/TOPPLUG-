FROM quay.io/Hubdarkweb/md:beta
RUN git clone https://github.com/Hubdarkweb/Cyberpunk.git /root/LyFE/
WORKDIR /root/LyFE/
RUN yarn install
CMD ["npm", "start"]
