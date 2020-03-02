import styled, { css } from 'styled-components'

import Header from './header'
import Footer from './footer'

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
  padding: 0 16px;
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
  font-family: 'Raleway', sans-serif;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.15em;
  ${mq.sp`
    font-size: 24vw;
  `}
  ${mq.min`
    font-size: 8rem;
  `}
`

const ArticleBase = props => (
  <>
    <Header />
    <Wrapper>
      <Content>{props.children}</Content>
    </Wrapper>
    <Footer />
  </>
)

export default ArticleBase
