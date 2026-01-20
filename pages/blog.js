import { styled } from '../stitches.config'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'

export async function getStaticProps() {
  let posts = []

  try {
    // Fetch Substack RSS feed via rss2json
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://alexanderstratmoen.substack.com/feed`
    )
    const data = await res.json()

    if (data.status === 'ok') {
      posts = data.items.slice(0, 10).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description?.replace(/<[^>]*>/g, '').slice(0, 200) + '...',
        thumbnail: item.thumbnail || null,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch Substack feed:', error)
  }

  return {
    props: {
      title: 'Blog - Alexander Stratmoen',
      description: 'Thoughts and writings from Alexander Stratmoen',
      posts,
    },
    revalidate: 3600, // Revalidate every hour
  }
}

export default function Blog({ title, description, posts }) {
  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://alexanderstratmoen.ca/blog" property="og:url" />
      </Head>

      <Navbar />
      <Main>
        <PostContent>
          <PostContainer>
            <Header>
              <h1>Blog</h1>
              <Subtitle>
                Posts from my <SubstackLink href="https://alexanderstratmoen.substack.com" target="_blank" rel="noopener noreferrer">Substack</SubstackLink>
              </Subtitle>
            </Header>

            {posts.length > 0 ? (
              <PostList>
                {posts.map((post, index) => (
                  <PostItem key={index} href={post.link} target="_blank" rel="noopener noreferrer">
                    <PostTitle>{post.title}</PostTitle>
                    <PostDate>{new Date(post.pubDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</PostDate>
                    <PostDescription>{post.description}</PostDescription>
                  </PostItem>
                ))}
              </PostList>
            ) : (
              <EmptyState>
                <p>No posts available. Check out my <a href="https://alexanderstratmoen.substack.com" target="_blank" rel="noopener noreferrer">Substack</a> directly.</p>
              </EmptyState>
            )}
          </PostContainer>
        </PostContent>
      </Main>
      <Footer />
    </Wrapper>
  )
}

const Main = styled(PostMain, {
  margin: '0 auto',
  paddingTop: '100px',
  '@bp2': { width: 800 },
})

const Header = styled('div', {
  marginBottom: '40px',
  '& h1': {
    marginBottom: '8px',
  },
})

const Subtitle = styled('p', {
  color: '$secondary',
  fontSize: '16px',
})

const SubstackLink = styled('a', {
  color: '$primary',
  textDecoration: 'underline',
  '&:hover': {
    opacity: 0.8,
  },
})

const PostList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
})

const PostItem = styled('a', {
  display: 'block',
  padding: '24px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
  textDecoration: 'none',
  transition: 'background 0.2s ease-in-out',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
})

const PostTitle = styled('h2', {
  fontSize: '20px',
  fontWeight: 600,
  color: '$primary',
  marginBottom: '8px',
})

const PostDate = styled('span', {
  fontSize: '14px',
  color: '$secondary',
  display: 'block',
  marginBottom: '12px',
})

const PostDescription = styled('p', {
  fontSize: '16px',
  color: '$secondary',
  lineHeight: 1.6,
})

const EmptyState = styled('div', {
  textAlign: 'center',
  padding: '40px',
  color: '$secondary',
  '& a': {
    color: '$primary',
    textDecoration: 'underline',
  },
})
