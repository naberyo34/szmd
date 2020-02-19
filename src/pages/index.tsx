import Link from 'next/link'
// import Header from '../components/header'
// import ExtLink from '../components/ext-link'
// import Features from '../components/features'
// import GitHub from '../components/svgs/github'
// import sharedStyles from '../styles/shared.module.css'

import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Content = styled.section`
  width: 1000px;
  text-align: center;
`

const Title = styled.h1`
  position: relative;
  left: -0.05em;
  font-size: 20rem;
  font-weight: 900;
  letter-spacing: -0.15em;
`
const Address = styled.h2`
  position: relative;
  top: -1em;
  font-size: 2.4rem;
  font-weight: 700;
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
`

const Menu = styled.ul`
  position: fixed;
  bottom: 20px;
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
  <Wrapper>
    <Content>
      <Title>SZMD</Title>
      <Address>szmd.jp</Address>
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
    </Content>
  </Wrapper>
)
