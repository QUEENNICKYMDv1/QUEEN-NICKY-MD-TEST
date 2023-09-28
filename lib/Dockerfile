FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/Cola2007/cola /root/moxie 
WORKDIR /root/moxie/
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
