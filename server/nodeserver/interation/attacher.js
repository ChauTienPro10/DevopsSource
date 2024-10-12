import Web3 from 'web3';
import dotenv from 'dotenv';
dotenv.config();
// const web3 = new Web3(process.env.GANACHE);
// console.log(process.env.GANACHE);
const web3 = new Web3('http://localhost:8546');

export const createAccount = async () => {
    // Tạo tài khoản mới
    const newAccount = web3.eth.accounts.create();
    const account = web3.eth.accounts.privateKeyToAccount(newAccount.privateKey);
    
    web3.eth.accounts.wallet.add(account);
    
    
    console.log('New account created:');
    console.log('Address:', newAccount.address);
    console.log('Private Key:', newAccount.privateKey);
    return account;
  };

  export async function sendETH(fromAddress, privateKey, toAddress, amount) { 
    try {
      const nonce = await web3.eth.getTransactionCount(fromAddress, 'latest');
      
      // Estimate the gas required for the transaction
      const gasEstimate = await web3.eth.estimateGas({
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toWei(amount, 'ether'),
      });
  
      const transaction = {
        to: toAddress,
        value: web3.utils.toWei(amount, 'ether'), // Amount in ETH
        gas: gasEstimate,
        gasPrice: web3.utils.toWei('20', 'gwei'), // Setting gasPrice manually (adjustable)
        nonce: nonce,
      };
  
      // Sign the transaction with the sender's private key
      const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
  
      // Send the signed transaction
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      // Custom serialization to handle BigInt
      console.log('Transaction receipt:', JSON.stringify(receipt, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
  
      return receipt;
      
    } catch (error) {
      console.error('Error sending ETH:', error);
    }
  }

  export async function getBalance(address) { // xem so du cua dia chi 
    try {
      const balance = await web3.eth.getBalance(address);
      const balanceInEther = web3.utils.fromWei(balance, 'ether');
      console.log(`Balance of ${address} is ${balanceInEther} ETH`);
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  }
  
  export async function checkContractExists(contractAddress) { // kiem tra hop dong co trong server hay khong
    try {
      const code = await web3.eth.getCode(contractAddress);
      if (code !== '0x') {
        console.log(`Contract at ${contractAddress} exists.`);
      } else {
        console.log(`Contract at ${contractAddress} does not exist.`);
      }
    } catch (error) {
      console.error('Error checking contract existence:', error);
    }
  }

  async function getAccounts() {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Các tài khoản trong Ganache:', accounts);
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy tài khoản:', error);
    }
}
  
// getAccounts();
//  getBalance('0xf4E0C94A07d2F5bc61f99c83210B694f80EaEDf8')
//  getBalance('0xf4E0C94A07d2F5bc61f99c83210B694f80EaEDf8')
// sendETH('0xFF28c487c56da7e291185dAA2f9074443502b3b9','0xc777c222f1268c15213620de6b139260c7b97b1540ec5b512053234fb76a95b7'
//   ,'0xf4E0C94A07d2F5bc61f99c83210B694f80EaEDf8',90
// )

export default web3


// createAccount();

// Address: 0xf4E0C94A07d2F5bc61f99c83210B694f80EaEDf8
// Private Key: 0x3a2c6ec51789293325673a6824fb59f2d00d7d2a66970980629ffd6f3caff631
//0x45f645953c92ba48fa4f9b24cc66e5003c4ed314
checkContractExists('0x45f645953c92ba48fa4f9b24cc66e5003c4ed314');