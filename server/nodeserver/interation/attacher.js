import Web3 from 'web3';
import dotenv from 'dotenv';
dotenv.config();
const web3 = new Web3(process.env.GANACHE);
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

  async function sendETH(fromAddress, privateKey, toAddress, amount) { 
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
  // Gọi hàm tạo tài khoản
//   createAccount();
getBalance("0xDDEcf5e7318E5CE706585B56134928FAa3639CA9");

// sendETH("0x90AF2ccF2eEFf37fed9bBB739c45D8651504A1da","0x24571e852315cdf65274fd25fb658b001b1be62972f931b989d6ded2a96998e2"
//     ,"0xDDEcf5e7318E5CE706585B56134928FAa3639CA9",2
// )
getBalance("0x90AF2ccF2eEFf37fed9bBB739c45D8651504A1da");
checkContractExists("0x955cd7db8ee229864a41eaa1dbdb216aad225b29");
// getBalance("0xDDEcf5e7318E5CE706585B56134928FAa3639CA9");

//   Address: 0x90AF2ccF2eEFf37fed9bBB739c45D8651504A1da
// Private Key: 0x24571e852315cdf65274fd25fb658b001b1be62972f931b989d6ded2a96998e2
// Contract created: 0x955cd7db8ee229864a41eaa1dbdb216aad225b29



export default web3