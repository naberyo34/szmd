import Link from 'next/link'
// import Header from '../components/header'
// import ExtLink from '../components/ext-link'
// import Features from '../components/features'
// import GitHub from '../components/svgs/github'
// import sharedStyles from '../styles/shared.module.css'

import styled from 'styled-components'

const color = {
  text: '#333',
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
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  background: ${color.bg};
  animation: shrink 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  visibility: hidden;
  animation: fade 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.4s forwards;
`

const Heading = styled.h2`
  margin-top: 0.5em;
  font-size: 20rem;
  font-weight: 900;
  letter-spacing: -0.15em;
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

const Footer = styled.footer`
  margin-top: 100px;
  padding-bottom: 10px;
  color: ${color.bg};
  text-align: center;
  border-bottom: 10px solid ${color.bg};
`

// 諸々の事情でLinkに直接スタイルを当てることができない
const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`

const Author = styled.section`
  margin: 200px auto 0 auto;
  padding-bottom: 40px;
  width: 800px;
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
      <small>Copyright (C) SZMD All rights reserved.</small>
    </Footer>
  </>
)
