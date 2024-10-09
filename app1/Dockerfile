# Sử dụng Python 3.9 slim
FROM python:3.9-slim

# Cài đặt ping (iputils-ping)
RUN apt-get update && apt-get install -y iputils-ping

# Sao chép mã ứng dụng vào container
WORKDIR /app
COPY app1.py .

# Cài đặt Flask và requests
RUN pip install flask requests

# Chạy ứng dụng
CMD ["python", "app1.py"]
