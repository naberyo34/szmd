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
  margin-top: -0.5em;
  font-size: 20rem;
  font-weight: 900;
  letter-spacing: -0.15em;
  ${mq.sp`
    font-size: 24vw;
  `}
  ${mq.min`
    font-size: 10rem;
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

const Author = styled.section`
  margin: 200px auto 0 auto;
  padding: 0 20px 40px 20px;
  background: ${color.window};
  border-radius: 20px;
  text-align: center;
`

const AuthorIcon = styled.img`
  position: relative;
  top: -100px;
`

const AuthorName = styled.h3`
  margin-top: -100px;
  font-size: 4.8rem;
`

const AuthorDescription = styled.p`
  margin-top: 40px;
  font-size: 1.6rem;
  ${mq.sp`
    text-align: left;
  `}
`

export default () => (
  <>
    <AnimateBg />
    <Wrapper>
      <Content>
        <Heading>ABOUT</Heading>
        <Author>
          <AuthorIcon src="/about_icon.png" alt="tamaのアイコン" width="200" />
          <AuthorName>tama</AuthorName>
          <AuthorDescription>
            平日は駆け出しエンジニア、週末は趣味でイラストやデザインをやっています。
            <br />
            音楽とカレーが好きです。
          </AuthorDescription>
        </Author>
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
