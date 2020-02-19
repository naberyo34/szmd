import Link from 'next/link'
import styled, { css } from 'styled-components'

const width = {
  iphone5: '320px',
  ipad: '768px',
}

const mq = {
  sp: (...args) => css`
    @media (max-width: ${width.ipad}) {
      ${css(...args)};
    }
  `,
  min: (...args) => css`
    @media (max-width: ${width.iphone5}) {
      ${css(...args)};
    }
  `,
}

const color = {
  content: '#fff',
  window: '#fafafa',
  bg: '#f6d365',
}

const AnimateBg = styled.div`
  @keyframes shrink {
    0% {
      height: 200vh;
    }

    100% {
      height: 200px;
    }
  }
  padding: 20px;
  min-width: ${width.iphone5};
  animation: shrink 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${width.iphone5};
  background: ${color.content};
`

const Content = styled.section`
  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
      visibility: visible;
    }
  }
  width: 1000px;
  padding: 0 8px;
  visibility: hidden;
  animation: fade 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.4s forwards;
  ${mq.sp`
    width: 100vw;
    min-width: ${width.iphone5};
  `}
`

const Heading = styled.h2`
  margin: -0.5em 0 0 8px;
  font-size: 20rem;
  font-weight: 900;
  letter-spacing: -0.15em;
  ${mq.sp`
    font-size: 24vw;
  `}
  ${mq.min`
    font-size: 8rem;
  `}
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
`

const Menu = styled.ul`
  display: flex;
`

const MenuItem = styled.li`
  font-size: 1.6rem;
  font-weight: 700;
  margin-left: 20px;
  transition: 0.2s;
  &:hover {
    opacity: 0.4;
  }
  &:first-child {
    margin-left: 0;
  }
`

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
  font-weight: 900;
  letter-spacing: -0.15em;
  transition: 0.2s;
  &:hover {
    color: #333;
  }
`

const HeaderMenu = styled.nav`
  font-size: 1.2rem;
`

const Footer = styled.footer`
  min-width: ${width.iphone5};
  padding-top: 200px;
  padding-bottom: 10px;
  color: ${color.bg};
  background: ${color.content};
  border-bottom: 8px solid ${color.bg};
  text-align: center;
`

const Copyright = styled.small`
  display: inline-block;
  margin-top: 10px;
`

// 諸々の事情でLinkに直接スタイルを当てることができない
const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`

const Base = props => (
  <>
    <AnimateBg>
      <HeaderWrapper>
        <Header>
          <HeaderIcon>
            <Link href="/">
              <LinkText href="/">SZMD</LinkText>
            </Link>
          </HeaderIcon>
          <HeaderMenu>
            <p>MENU</p>
          </HeaderMenu>
        </Header>
      </HeaderWrapper>
    </AnimateBg>
    <Wrapper>
      <Content>
        {props.heading ? <Heading>{props.heading}</Heading> : <></>}
        {props.children}
      </Content>
    </Wrapper>
    <Footer>
      <Nav>
        <Menu>
          <MenuItem>
            <Link href="/about">
              <LinkText href="/about">ABOUT</LinkText>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/blog">
              <LinkText href="/blog">BLOG</LinkText>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/works">
              <LinkText href="/works">WORKS</LinkText>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/contact">
              <LinkText href="/contact">CONTACT</LinkText>
            </Link>
          </MenuItem>
        </Menu>
      </Nav>
      <Copyright>Copyright (C) SZMD All rights reserved.</Copyright>
    </Footer>
  </>
)

export default Base
