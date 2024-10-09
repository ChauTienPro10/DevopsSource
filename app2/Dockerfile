# Sử dụng Python 3.9
FROM python:3.9-slim

# Sao chép mã ứng dụng vào container
WORKDIR /app
COPY app2.py .

# Cài đặt Flask
RUN pip install flask

# Chạy ứng dụng
CMD ["python", "app2.py"]
