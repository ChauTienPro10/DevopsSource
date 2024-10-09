#!/bin/sh

# Khởi động Ganache và lưu thông tin tài khoản
ganache-cli --accounts 10 --defaultBalanceEther 100 --blockTime 2 --db /app --host 0.0.0.0 --mnemonic "test test test test test test test test test test test junk" > ganache.log 2>&1 &

# Đọc thông tin tài khoản từ ganache.log
sleep 5 # Đợi một chút để Ganache khởi động hoàn toàn
echo "Đã khởi động Ganache. Các tài khoản và private key:"
cat ganache.log | grep '0x'
