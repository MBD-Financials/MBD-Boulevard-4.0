import { FC } from 'react'
import { Text, Box, Flex, Anchor, Button } from '../primitives'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTelegram, faFacebook, faYoutube, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'


type SectionTitleProps = {
  title: string
}

const SectionTitle: FC<SectionTitleProps> = ({ title }) => (
  <Text style="subtitle1" css={{ color: '$gray12', mb: 8 }}>
    {title}
  </Text>
)

type SectionLinkProps = {
  name: string
  href: string
}

const SectionLink: FC<SectionLinkProps> = ({ name, href }) => (
  <Anchor
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    weight="medium"
    css={{ fontSize: 14, mt: 16 }}
  >
    {name}
  </Anchor>
)

const developerSectionLinks = [
  {
    name: 'Docs',
    href: 'https://docs.mbdfinancials.com/',
  },
  // {
  //   name: 'API Reference',
  //   href: 'https://docs.reservoir.tools/reference/overview',
  // },
  {
    name: 'Github',
    href: 'https://github.com/MBD-Financials',
  },
]

const companySectionLinks = [
  
  {
    name: 'Terms of Use',
    href: 'https://mbdfinancials.com/terms-conditions/',
  },
  {
    name: 'Privacy Policy',
    href: 'https://mbdfinancials.com/privacy-policy-3/',
  },
]

export const Footer = () => {
  return (
    <Flex
      justify="between"
      css={{
        borderTop: '1px solid $gray7',
        borderStyle: 'solid',
        pt: '$5',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 36,
        '@bp600': {
          flexDirection: 'row',
          gap: 0,
        },
      }}
    >
      <Flex css={{ gap: 80, '@bp600': { gap: 136 } }}>
        <Flex direction="column">
          <SectionTitle title="Developers" />
          {developerSectionLinks.map((props) => (
            <SectionLink key={props.name} {...props} />
          ))}
        </Flex>
        <Flex direction="column">
          <SectionTitle title="Company" />
          {companySectionLinks.map((props) => (
            <SectionLink key={props.name} {...props} />
          ))}
        </Flex>
      </Flex>
      <Flex
        direction="column"
        css={{ alignItems: 'flex-start', '@bp600': { alignItems: 'flex-end' } }}
      >
        <SectionTitle title="Follow MBD" />
        <Flex css={{ gap: '$4', mt: 16 }}>
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
    </Flex>
  )
}
