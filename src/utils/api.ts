import { ethers } from 'ethers'
import minAbi from 'utils/minAbi.json'

const MORALIS_API_BASE_URL = 'https://deep-index.moralis.io/api/v2'

export const getFetchUrl = async (searchValue: string): Promise<string> => {
  const { ethereum } = window
  const provider = new ethers.providers.Web3Provider(ethereum)

  // getWalletNFTs
  const walletUrl = `${MORALIS_API_BASE_URL}/${searchValue}/nft?chain=eth&format=decimal`
  // getContractNFTs
  const contractUrl = `${MORALIS_API_BASE_URL}/nft/${searchValue}?chain=eth&format=decimal&limit=100`
  // searchNFTs
  const searchUrl = `${MORALIS_API_BASE_URL}/nft/search?chain=eth&format=decimal&q=${encodeURIComponent(
    searchValue
  )}&filter=global&limit=100`

  if (ethers.utils.isAddress(searchValue)) {
    const address = ethers.utils.getAddress(searchValue)
    let isContract = true
    try {
      const contract = new ethers.Contract(address, minAbi, provider)
      await contract.symbol()
    } catch {
      isContract = false
    }
    return isContract ? contractUrl : walletUrl
  } else {
    return searchUrl
  }
}
