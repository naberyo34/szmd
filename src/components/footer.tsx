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

const Footer = styled.footer`
  min-width: ${width.iphone5};
  padding-top: 200px;
  padding-bottom: 10px;
  color: ${color.bg};
  text-align: center;
  background: ${color.content};
  border-bottom: 8px solid ${color.bg};
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
`

const Menu = styled.ul`
  display: flex;
`

const MenuItem = styled.li`
  margin-left: 20px;
  font-family: 'Raleway', sans-serif;
  font-size: 1.6rem;
  font-style: italic;
  font-weight: 700;
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

const Copyright = styled.small`
  display: inline-block;
  margin-top: 10px;
  font-family: 'Raleway', sans-serif;
  font-style: italic;
`

export default () => (
  <Footer>
    <Nav>
      <Menu>
        <MenuItem>
          <Link href="/about">
            <LinkText href="/about">ABOUT</LinkText>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/works">
            <LinkText href="/works">WORKS</LinkText>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/blog">
            <LinkText href="/blog">BLOG</LinkText>
          </Link>
        </MenuItem>
      </Menu>
    </Nav>
    <Copyright>Copyright (C) SZMD All rights reserved.</Copyright>
  </Footer>
)
