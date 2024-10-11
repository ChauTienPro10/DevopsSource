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
  

getBalance('0xeE2C4D5aAFC4dD96E4B4C84f8A50AaA8683D5e10')
getBalance('0x68A5346A5DAFBFf2f276FEbcfBc4e16ab755c1Ef')


export default web3


// Address: 0x58AAf963Cb390F2Af84bb0bdD1C2e9d9eac41891
// Private Key: 0xcf8aa349a6e6e2acf65c2355720eca2c158ccb49b0ba9707daf8ce04071dceb8
//Contract created: 0x02ee427f46242d951dfd5f0a0d24853f1ead57f4