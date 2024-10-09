# Sử dụng image chính thức của Node.js
FROM node:18.13.0

# Cài đặt Git
RUN apt-get update && apt-get install -y git

# Chỉ định thư mục làm việc trong container
WORKDIR /app

# Sao chép mã nguồn từ thư mục myclient vào thư mục làm việc
COPY myclient ./myclient/

# Chuyển đến thư mục chứa ứng dụng
WORKDIR /app/myclient
# RUN echo "REACT_APP_SERVER=${REACT_APP_SERVER}" > .env

# Cài đặt các package cần thiết
RUN npm install

# Mở cổng 3000 để truy cập ứng dụng
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "run", "start"]
