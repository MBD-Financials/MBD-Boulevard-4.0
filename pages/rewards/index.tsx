import { NextPage } from 'next'
import { Text, Flex, Box } from '../../components/primitives'
import Layout from 'components/Layout'
import { useMediaQuery } from 'react-responsive'
import React, { useState} from 'react'
import Input from 'components/primitives/Input'
import TextArea from 'components/primitives/TextArea'
import { useUserCollections } from '@reservoir0x/reservoir-kit-ui'
import { useMounted } from '../../hooks'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { COLLECTION_SET_ID, COMMUNITY } from 'pages/_app'
import ChainToggle from 'components/common/ChainToggle'
import { Head } from 'components/Head'
import Button from 'components/primitives/Button'
import DropZone from 'components/DropZone/DropZone'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useSigner, useAccount } from 'wagmi'
import { useRouter } from "next/router";

const IndexPage: NextPage = () => {
  const { address, isConnected } = useAccount()
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const { data: signer, isError, isLoading } = useSigner()
  const router = useRouter();


     //---FETCHING SMART CONTRACT
const fetchContract = async () => {

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.NEXT_PUBLIC_PRIVATE_KEY!,
    "polygon"
  );

  const mintSigner = await sdk.getContract(
    // Replace this with your NFT Collection contract address
    "0x42EB6537AFD6a6DD5d5feB9705eb33A59Db143B4",
    "nft-collection"
  );
  
  const thirdwebSDK = ThirdwebSDK.fromSigner(signer!);
  const userContract = await thirdwebSDK.getContract(
    "0x42EB6537AFD6a6DD5d5feB9705eb33A59Db143B4",
    "nft-collection"
  );
  return [mintSigner, userContract];
}


const mintNFT = async (name:string, image:string, description:string) => {
  
  if (!name || !description || !image)
  return;

  try {
    const contracts = await fetchContract();
    const mintSigner = contracts[0];
    const contract = contracts[1];
    const data = {
      to: address!,
      metadata: {
        name,
        description,
        image,
      },
    };
    const signedPayload = await mintSigner.erc721.signature.generate(data);

    const isValid = await contract.erc721.signature.verify(signedPayload);
    console.log(isValid);

    const tx = await contract.erc721.signature.mint(signedPayload);
    alert("Minted Succesfully!!");
    // const nft = await tx.data(); // (optional) fetch details of minted NFT

    router.push("/portfolio");
  } catch (error) {
    console.log(error);
    // alert(error)
  }
};


const [tokenFiltersOpen, setTokenFiltersOpen] = useState(true)
const [filterCollection, setFilterCollection] = useState<string | undefined>(
  undefined
)
  const isSmallDevice = useMediaQuery({ maxWidth: 905 })
  const isMounted = useMounted()
  
  
  

  let collectionQuery: Parameters<typeof useUserCollections>['1'] = {
    limit: 100,
  }

  if (COLLECTION_SET_ID) {
    collectionQuery.collectionsSetId = COLLECTION_SET_ID
  } else if (COMMUNITY) {
    collectionQuery.community = COMMUNITY
  }

  const { data: collections, isLoading: collectionsLoading } =
    useUserCollections(address as string, collectionQuery)

  if (!isMounted) {
    return null
  }

 

  

  return (
    <>
      <Head />
      <Layout>
        <Flex
          direction="column"
          
          css={{
            px: '$4',
            textAlign:'center',
            py: 500,
            
            '@sm': {
              px: '$5',
            },
          }}
        >
            <Text style="h2" css={{}}>
                Coming Soon!
            </Text>
          
        </Flex>
      </Layout>
    </>
  )
}

export default IndexPage
