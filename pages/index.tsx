import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives'
import Layout from 'components/Layout'
import { ComponentPropsWithoutRef, useState } from 'react'
import { Footer } from 'components/home/Footer'
import { useMediaQuery } from 'react-responsive'
import { useMarketplaceChain, useMounted } from 'hooks'
import { useAccount } from 'wagmi'
import { paths } from '@reservoir0x/reservoir-sdk'
import { useCollections } from '@reservoir0x/reservoir-kit-ui'
import fetcher from 'utils/fetcher'
import { NORMALIZE_ROYALTIES, COLLECTION_SET_ID, COMMUNITY } from './_app'
import supportedChains from 'utils/chains'
import Link from 'next/link'
import ChainToggle from 'components/common/ChainToggle'
import CollectionsTimeDropdown, {
  CollectionsSortingOption,
} from 'components/common/CollectionsTimeDropdown'
import { Head } from 'components/Head'
import { CollectionRankingsTable } from 'components/rankings/CollectionRankingsTable'
import Collection from 'components/Collection/Collection'
import AudioLive from 'components/AudioLive/AudioLive'
import Slider from 'components/Slider/Slider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTelegram, faFacebook, faYoutube, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
type Props = InferGetStaticPropsType<typeof getStaticProps>

const IndexPage: NextPage<Props> = ({ ssr }) => {
  const isSSR = typeof window === 'undefined'
  const isMounted = useMounted()
  const compactToggleNames = useMediaQuery({ query: '(max-width: 800px)' })
  const [sortByTime, setSortByTime] =
    useState<CollectionsSortingOption>('1DayVolume')
  const marketplaceChain = useMarketplaceChain()
  const { isDisconnected } = useAccount()

  let collectionQuery: Parameters<typeof useCollections>['0'] = {
    limit: 10,
    sortBy: sortByTime,
    includeTopBid: true,
  }

  if (COLLECTION_SET_ID) {
    collectionQuery.collectionsSetId = COLLECTION_SET_ID
  } else if (COMMUNITY) {
    collectionQuery.community = COMMUNITY
  }

  const { data, isValidating } = useCollections(collectionQuery, {
    fallbackData: [ssr.collections[marketplaceChain.id]],
  })

  let collections = data || []

  let volumeKey: ComponentPropsWithoutRef<
    typeof CollectionRankingsTable
  >['volumeKey'] = 'allTime'

  switch (sortByTime) {
    case '1DayVolume':
      volumeKey = '1day'
      break
    case '7DayVolume':
      volumeKey = '7day'
      break
    case '30DayVolume':
      volumeKey = '30day'
      break
  }

  return (
    <Layout>
      <Head />
      <Box
        css={{
          p: 24,
          height: '100%',
          '@bp800': {
            p: '$6',
          },
        }}
      >
        {/* {isDisconnected && ( */}
          <Flex
            direction="column"
            align="center"
            css={{ mx: 'auto', maxWidth: 728, pt: '$5', textAlign: 'center' }}
          >
            <Text style="h3" css={{ mb: 24 ,mt:24}}>
              MBD Boulevard
            </Text>
            <Text style="body1" css={{ mb: 10 }}>
            Future of Shopping with our AI NFT Marketplace
            </Text>
            <Text style="body2" css={{ mb: 48 }}>
            Discover the most outstanding NTFs in all topics of life. Create your NTFs and sell them
            </Text>
            <a
              href=""
              target="_blank"
            >
              <Button color="gray3">AI Analytics(coming soon)</Button>
            </a>
              <Flex
              direction="row"
              align="center"
              css={{ mx: 'auto', maxWidth: 728, pt: '$5', textAlign: 'center',gap: '$4' }}
              >
                <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/MBDFinancials"
                >
                  <Button size="xs" color="gray3">
                    <FontAwesomeIcon icon={faTwitter} width={14} height={14} />
                  </Button>
                </a>
                
                <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/MBDFinancials"
                >
                  <Button size="xs" color="gray3">
                    <FontAwesomeIcon icon={faTelegram} width={14} height={14} />
                  </Button>
                </a>

                <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/MBDFinancials"
                >
                  <Button size="xs" color="gray3">
                    <FontAwesomeIcon icon={faFacebook} width={14} height={14} />
                  </Button>
                </a>

                <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/mbdfinancials/"
                >
                  <Button size="xs" color="gray3">
                    <FontAwesomeIcon icon={faInstagram} width={14} height={14} />
                  </Button>
                </a>

                <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/company/mbdfinancials/"
                >
                  <Button size="xs" color="gray3">
                    <FontAwesomeIcon icon={faLinkedin} width={14} height={14} />
                  </Button>
                </a> 

                <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UCju8ObUSidjgEvevlXc9pVg"
                >
                  <Button size="xs" color="gray3">
                    <FontAwesomeIcon icon={faYoutube} width={14} height={14} />
                  </Button>
                </a>  
            </Flex>

          </Flex>
        {/* )} */}
        <Flex css={{ my: '$6', gap: 65 }} direction="column">
          <Flex
            justify="between"
            align="start"
            css={{
              flexDirection: 'column',
              gap: 24,
              '@bp800': {
                alignItems: 'center',
                flexDirection: 'row',
              },
            }}
          >
            <Text style="h4" as="h4">
              Popular Collections
            </Text>
            <Flex align="center" css={{ gap: '$4' }}>
              <CollectionsTimeDropdown
                compact={compactToggleNames && isMounted}
                option={sortByTime}
                onOptionSelected={(option) => {
                  setSortByTime(option)
                }}
              />
              <ChainToggle />
            </Flex>
          </Flex>
          {isSSR || !isMounted ? null : (
            <CollectionRankingsTable
              collections={collections}
              loading={isValidating}
              volumeKey={volumeKey}
            />
          )}
          <Box css={{ alignSelf: 'center' }}>
            <Link href="/collection-rankings">
              <Button
                css={{
                  minWidth: 224,
                  justifyContent: 'center',
                }}
                size="large"
              >
                View All
              </Button>
            </Link>
          </Box>
        </Flex>
        
        <Flex css={{ my: '$6', gap: 65 }} direction="column">
        <Collection/>
        
        <Box css={{ alignSelf: 'center' }}>
          <Text style="h2">
          Audio Collection
          </Text>
        </Box>
        <AudioLive/>
        <Slider/>
        
        </Flex>
        
        <Footer />
      </Box>
    </Layout>
  )
}

type CollectionSchema =
  paths['/collections/v5']['get']['responses']['200']['schema']
type ChainCollections = Record<string, CollectionSchema>

export const getStaticProps: GetStaticProps<{
  ssr: {
    collections: ChainCollections
  }
}> = async () => {
  let collectionQuery: paths['/collections/v5']['get']['parameters']['query'] =
    {
      sortBy: '1DayVolume',
      normalizeRoyalties: NORMALIZE_ROYALTIES,
      includeTopBid: true,
      limit: 10,
    }

  if (COLLECTION_SET_ID) {
    collectionQuery.collectionsSetId = COLLECTION_SET_ID
  } else if (COMMUNITY) {
    collectionQuery.community = COMMUNITY
  }

  const promises: ReturnType<typeof fetcher>[] = []
  supportedChains.forEach((chain) => {
    promises.push(
      fetcher(`${chain.reservoirBaseUrl}/collections/v5`, collectionQuery, {
        headers: {
          'x-api-key': chain.apiKey || '',
        },
      })
    )
  })
  const responses = await Promise.allSettled(promises)
  const collections: ChainCollections = {}
  responses.forEach((response, i) => {
    if (response.status === 'fulfilled') {
      collections[supportedChains[i].id] = response.value.data
    }
  })

  return {
    props: { ssr: { collections } },
    revalidate: 5,
  }
}

export default IndexPage
