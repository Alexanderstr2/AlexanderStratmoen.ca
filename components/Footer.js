import Link from 'next/link'
import { styled } from '../stitches.config'

export default function Footer() {
  const links = [
    {
      title: 'Email',
      url: 'mailto:hello@alexanderstratmoen.ca',
      icon: 'ri-mail-line',
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/alexstratmoen',
      icon: 'ri-twitter-line',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/Alexanderstr2',
      icon: 'ri-github-line',
    },
    {
      title: 'linkedin',
      url: 'https://www.linkedin.com/in/alexander-stratmoen-133380152/',
      icon: 'ri-linkedin-line',
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/alexstratmoen/',
      icon: 'ri-instagram-line',
    },
  ]

  const renderAnchor = (link, index) => {
    if (link.url.startsWith('http')) {
      return <Anchor key={index} href={link.url} target="_blank">
        <Title>{link.title}</Title>
        <Icon className={link.icon} />
      </Anchor>
    }

    return <Link key={index} href={link.url} passHref>
      <Anchor>
        <Title>{link.title}</Title>
        <Icon className={link.icon} />
      </Anchor>
    </Link>
  }

  return (
    <>
      <Container>
        {links.map(renderAnchor)}
      </Container>
      <Message>Thanks to <a href="https://github.com/zenorocha/zenorocha.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Zenorocha</a> for the amazing site template!</Message>
    </>
  )
}

const Container = styled('footer', {
  background: '$background',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0',
})

const Icon = styled('i', {
  color: '$primary',
  opacity: 1,
  marginLeft: '5px',
  marginTop: '1px',
  fontSize: '24px',
  '@bp2': { opacity: 0, fontSize: '16px' },
})

const Anchor = styled('a', {
  color: '$secondary',
  display: 'flex',
  fontSize: '15px',
  border: 0,
  marginLeft: '20px',
  textDecoration: 'none',
  textTransform: 'lowercase',
  transition: 'color $duration ease-in-out',
  '&:hover, &:focus': {
    color: '$primary',
    opacity: 1,
  },
  [`&:hover ${Icon}`]: {
    transition: 'opacity $duration ease-in-out',
    opacity: 1,
  },
  '&:first-child': { margin: '0' },
})

const Title = styled('span', {
  display: 'none',
  '@bp2': { display: 'block' },
})

const Message = styled('div', {
  color: '$secondary',
  textAlign: 'center',
  paddingTop: '20px',
  paddingBottom: '20px',
  fontSize: '15px',
});
