import styled, { css } from 'styled-components'
import Base from '../components/base'

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
  window: '#fafafa',
}

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
  <Base heading="ABOUT">
    <Author>
      <AuthorIcon src="/about_icon.png" alt="tamaのアイコン" width="200" />
      <AuthorName>tama</AuthorName>
      <AuthorDescription>
        平日は駆け出しエンジニア、週末は趣味でイラストやデザインをやっています。
        <br />
        音楽とカレーが好きです。
      </AuthorDescription>
    </Author>
  </Base>
)
