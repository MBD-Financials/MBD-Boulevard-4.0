import { useRef } from 'react'
import { Box, Flex} from '../primitives'
import GlobalSearch from './GlobalSearch'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
import Link from 'next/link'
import Image from 'next/image'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import NavItem from './NavItem'
import ThemeSwitcher from './ThemeSwitcher'
import HamburgerMenu from './HamburgerMenu'
import MobileSearch from './MobileSearch'
import { useTheme } from 'next-themes'
import { useMediaQuery } from 'react-responsive'
import { useMounted } from '../../hooks'
import { useAccount } from 'wagmi'
import { ProfileDropdown } from './ProfileDropdown'
import CartButton from './CartButton'

export const NAVBAR_HEIGHT = 81
export const NavBAR_HEIGHT_TOP = 30
export const NAVBAR_HEIGHT_MOBILE = 77

const Navbar = () => {
  const { theme } = useTheme()
  const { isConnected } = useAccount()
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const isMounted = useMounted()
  let searchRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  useHotkeys('meta+k', () => {
    if (searchRef?.current) {
      searchRef?.current?.focus()
    }
  })

  if (!isMounted) {
    return null
  }

  return isMobile ? (
    <Flex
      css={{
        height: NAVBAR_HEIGHT_MOBILE,
        px: '$4',
        width: '100%',
        borderBottom: '1px solid $gray4',
        zIndex: 999,
        background: '$slate1',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
      align="center"
      justify="between"
    >
      <Box css={{ flex: 1 }}>
        <Flex align="center">
          <Link href="/">
            <Box css={{ width: 34, cursor: 'pointer' }}>
            {theme == 'dark' ? (
                <Image
                  src="/mbddark.png"
                  width={34}
                  height={34}
                  alt="mbd"
                />
              ) : (
                <Image
                  src="/mbdlight.png"
                  width={34}
                  height={34}
                  alt="mbd"
                />
              )}
              
            </Box>
          </Link>
        </Flex>
      </Box>
      <Flex align="center" css={{ gap: '$3' }}>
        <MobileSearch key={`${router.asPath}-search`} />
        <CartButton />
        <HamburgerMenu key={`${router.asPath}-hamburger`} />
      </Flex>
    </Flex>
  ) : (
    
    <Flex>
    <Flex
      css={{
        height: NavBAR_HEIGHT_TOP,
        px: '$5',
        width: '100%',
        maxWidth: 1920,
        mx: 'auto',
        borderBottom: '1px solid $gray4',
        zIndex: 999,
        background: '$neutralBg',
        position: 'fixed',
        top: 0,
        // left: 0,
        // right: 0,
        // bottom:0
      }}
      
      align="center"
      justify="between"
    >
      <Link href="">
        <NavItem active={false}>{}</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>{}</NavItem>
      </Link>
      <Link href="">
        <NavItem active={false}>{}</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>{}</NavItem>
      </Link>
      <Link href="">
        <NavItem active={false}>{}</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>{}</NavItem>
      </Link>
      <Link href="">
        <NavItem active={false}>{}</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>{}</NavItem>
      </Link>
      
      <Link href="">
        <NavItem active={router.pathname == ''}>
        MBD Gemz - Coming Soon
        </NavItem>
      </Link>
      
      <Link href="">
        <NavItem active={router.pathname == ''}>
        Subscription
        </NavItem>
      </Link>
      {/* https://mbdme.netlify.app/ */}
      <Link href="">
        <NavItem active={router.pathname == ''}>
        Launchpad
        </NavItem>
      </Link>
      
      <Link href="https://mbdsend.netlify.app/">
        <NavItem active={router.pathname == ''}>CryptoiT!</NavItem>
      </Link>

     

      <Link href="https://aistudio.netlify.app/">
        <NavItem active={false}>AI Studio</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>Add to inventory</NavItem>
      </Link>

      

      

    
    </Flex>
    <Flex
      css={{
        height: NAVBAR_HEIGHT,
        px: '$5',
        width: '100%',
        maxWidth: 1920,
        mx: 'auto',
        borderBottom: '1px solid $gray4',
        zIndex: 999,
        background: '$neutralBg',
        position: 'fixed',
        top: NavBAR_HEIGHT_TOP,
        // top: 0,
        left: 0,
        right: 0,
      }}
      align="center"
      justify="between"
    >
      <Box css={{ flex: 1 }}>
        <Flex align="center">
          <Link href="/">
            <Box css={{ width: 112, cursor: 'pointer' }}>
              {theme == 'dark' ? (
                <Image
                  src="/mbddark.png"
                  width={112}
                  height={36}
                  alt="Reservoir"
                />
              ) : (
                <Image
                  src="/mbdlight.png"
                  width={112}
                  height={36}
                  alt="Reservoir"
                />
              )}
            </Box>
          </Link>

          <Box css={{ flex: 1, px: '$5', maxWidth: 460 }}>
            <GlobalSearch
              ref={searchRef}
              placeholder="Search collections and addresses"
              containerCss={{ width: '100%' }}
              key={router.asPath}
            />
          </Box>

          <Flex align="center" css={{ gap: '$5', mr: '$5' }}>
            <Link href="/collection-rankings">
              <NavItem active={router.pathname == '/collection-rankings'}>
                Collections
              </NavItem>
            </Link>
            <Link href="/portfolio">
              <NavItem active={router.pathname == '/portfolio'}>Sell</NavItem>
            </Link>
            <Link href="/mint">
              <NavItem active={false}>Mint</NavItem>
            </Link>
            <Link href="/rewards">
              <NavItem active={false}>Rewards</NavItem>
            </Link>
          </Flex>

        </Flex>
      </Box>

      <Flex css={{ gap: '$3' }} justify="end" align="center">
        <ThemeSwitcher />
        <CartButton />
        {isConnected ? (
          <ProfileDropdown />
        ) : (
          <Box css={{ maxWidth: '185px' }}>
            <ConnectWalletButton />
          </Box>
        )}
      </Flex>
      
    </Flex>

    <Flex
      css={{
        // height: NAVBAR_HEIGHT,
        px: '$5',
        width: '100%',
        maxWidth: 1920,
        mx: 'auto',
        borderBottom: '1px solid $gray4',
        // zIndex: 999,
        background: '$neutralBg',
        position: 'fixed',
        top: NAVBAR_HEIGHT+NavBAR_HEIGHT_TOP,
        // left: 0,
        // right: 0,
      }}
      
      align="center"
      justify="between"
    >

      <Link href="/collection-rankings">
        <NavItem active={router.pathname == '/'}>
        Home
        </NavItem>
      </Link>
      
      <Link href="">
        <NavItem active={router.pathname == '/portfolio'}>Electronics</NavItem>
      </Link>
      
      <Link href="">
        <NavItem active={false}>Computers</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>Video Games</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>Home & Garden</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>Health & Beauty</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>Collectibles & Art</NavItem>
      </Link>
      <Link href="">
        <NavItem active={router.pathname == ''}>Charity!</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>Books</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>Music</NavItem>
      </Link>

      <Link href="">
        <NavItem active={false}>Deals</NavItem>
      </Link>
      <Link href="">
        <NavItem active={false}>Limited Edition</NavItem>
      </Link>
      <Link href="">
        <NavItem active={false}>Other</NavItem>
      </Link>
      <Link href="">
        <NavItem active={false}>More</NavItem>
      </Link>
    
    </Flex>

    

    </Flex>
  )
}

export default Navbar
