import Link from 'next/link'
// import Header from '../components/header'
// import ExtLink from '../components/ext-link'
// import Features from '../components/features'
// import GitHub from '../components/svgs/github'
// import sharedStyles from '../styles/shared.module.css'

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

const Wrapper = styled.div`
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
  height: calc(100vh - 40px);
  visibility: hidden;
  animation: fade 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
`

const Content = styled.section`
  text-align: center;
`

const Title = styled.h1`
  position: relative;
  left: -0.05em;
  font-size: 20rem;
  font-weight: 900;
  letter-spacing: -0.15em;
  ${mq.sp`
    font-size: 32vw;
  `}
  ${mq.min`
    font-size: 10rem;
  `}
`
const Address = styled.h2`
  position: relative;
  top: -1em;
  font-size: 2.4rem;
  font-weight: 700;
  ${mq.sp`
    font-size: 4vw;
  `}
  ${mq.min`
    font-size: 1.25rem;
  `}
`

const Footer = styled.footer`
  min-width: ${width.iphone5};
  height: 40px;
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

// 諸々の事情でLinkに直接スタイルを当てることができない
const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`

export default () => (
  <>
    <Wrapper>
      <Content>
        <div>
          <Title>SZMD</Title>
          <Address>szmd.jp</Address>
        </div>
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
    </Footer>
  </>
)
