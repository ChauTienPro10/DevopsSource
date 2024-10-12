# Sử dụng image chính thức của Ganache CLI
FROM trufflesuite/ganache-cli

# Tạo thư mục để lưu trữ file tài khoản
RUN mkdir -p /app

# Chỉ định thư mục làm việc
WORKDIR /app

# COPY start-ganache.sh ./start-ganache.sh
# RUN chmod +x ./start-ganache.sh
# RUN start-ganache.sh

# Mở cổng 8545 để truy cập Ganache
EXPOSE 8546

# Chạy script khởi động Ganache
# RUN echo "helliwoeld" > text.txt


CMD ["ganache-cli", "--db", "/app", "-a", "5", "-e", "100", "-p", "8546"]