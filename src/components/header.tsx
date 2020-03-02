import Link from 'next/link'
import styled from 'styled-components'

const width = {
  iphone5: '320px',
  ipad: '768px',
}

const color = {
  content: '#fff',
  window: '#fafafa',
  bg: '#f6d365',
}

const HeaderWrapper = styled.div`
  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
      visibility: visible;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-width: ${width.iphone5};
  visibility: hidden;
  animation: fade 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.4s forwards;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  color: ${color.content};
`

const HeaderIcon = styled.h1`
  display: inline-block;
  font-size: 2.4rem;
  font-family: 'Raleway', sans-serif;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.15em;
  transition: 0.2s;
  &:hover {
    color: #333;
  }
`

const HeaderMenu = styled.span`
  font-size: 1.2rem;
  font-family: 'Raleway', sans-serif;
  font-style: italic;
`

// 諸々の事情でLinkに直接スタイルを当てることができない
const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`

export default () => (
  <HeaderWrapper>
    <Header>
      <HeaderIcon>
        <Link href="/">
          <LinkText href="/">SZMD</LinkText>
        </Link>
      </HeaderIcon>
      <HeaderMenu>MENU</HeaderMenu>
    </Header>
  </HeaderWrapper>
)
