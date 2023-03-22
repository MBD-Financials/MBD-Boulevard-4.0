import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Text, Flex, Box } from '../../components/primitives'
//INTRNAL IMPORT
import Style from "./DropZone.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { create as ipfsHttpClient } from "ipfs-http-client";


const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  website,
  description,
  category,
  properties,
  setImage
}) => {
  const [fileUrl, setFileUrl] = useState(null);
  

  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  const projectSecretKey = process.env.NEXT_PUBLIC_PROJECT_SECRET_KEY;
  const subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN;
  const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
    "base64"
  )}`;
  
  const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  const uploadToIPFS = async (file) => {
		try {
			const added = await client.add({ content: file });

			const url = `${subdomain}/ipfs/${added.path}`;
			return url;
		} catch (error) {
			console.log(error);
		}
	};


  const onDrop = useCallback(async (acceptedFile) => {
    console.log(acceptedFile[0])
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
    setImage(url);
    console.log(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });



  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          <h1>{title}</h1>
          <div className={Style.DropZone_box_input_img}>
          <FontAwesomeIcon icon={faFolderPlus} size="2xl" />
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>

      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
          <Flex direction="column" justify="start" css={{ gap: '$4' }}>
            <Image src={fileUrl} alt="nft image" width={200} height={200} />
          </Flex>


            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
              <Flex direction="column" justify="between" css={{ gap: '$4' }}>
                  <Flex direction="row" justify="between" css={{ gap: '$4' }}>
                    <Text
                        style="h4"

                        css={{ color: '$white', textAlign: 'center' }}
                      >
                        NFT Name: 
                        {name || ""}
                    </Text>
                  </Flex>
                
                  <Flex direction="row" justify="between" css={{ gap: '$4' }}>
                    <Text
                      style="h4"
                      css={{ color: '$white', textAlign: 'center' }}
                    >
                      Website:
                      {website || ""}
                    </Text>
                  </Flex>
                <Flex direction="row" justify="between" css={{ gap: '$4' }}>
                <Text
                  style="h4"
                  css={{ color: '$white', textAlign: 'center' }}
                >
                  Properties:
                  {properties || ""}
                </Text>
                </Flex>
                <Flex direction="row" justify="between" css={{ gap: '$4' }}>
                <Text
                  style="h4"
                  css={{ color: '$white', textAlign: 'center' }}
                >

                  Description: 
                  {description || ""}
                </Text>
                </Flex>
                </Flex>
                
                


              </div>
            </div>
          </div>

        </aside>
      )}
    </div>
  );
};

export default DropZone;
