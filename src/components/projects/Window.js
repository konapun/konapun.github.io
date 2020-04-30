import React from 'react'
import styled, { css } from 'styled-components'
// import '98.css'

const noop = () => {}

export default ({ title, onClose = noop, onMinimize = noop, onMaximize = noop, width = 'auto', height = 'auto', children }) => (
  <Window width={width} height={height}>
    <TitleBar>
      <TitleBarText>{title}</TitleBarText>
      <TitleBarControls>
        <MinimizeButton aria-label="Minimize" onClick={onMinimize}/>
        <MaximizeButton aria-label="Maximize" onClick={onMaximize}/>
        <CloseButton aria-label="Close" onClick={onClose}/>
      </TitleBarControls>
    </TitleBar>
    <WindowBody>
      {children}
    </WindowBody>
  </Window>
)

const Window = styled.div`
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  background: #c0c0c0;
  padding: 3px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-corner {
    background: #dfdfdf;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #dfdfdf;
    box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  }
  &::-webkit-scrollbar-track {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='2' height='2' viewBox='0 0 2 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1 0H0V1H1V2H2V1H1V0Z' fill='%23C0C0C0'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 0H1V1H0V2H1V1H2V0Z' fill='white'/%3E %3C/svg%3E");
  }
`
const Text = css`
  font-family: Arial;
  font-size: 12px;
  color: #222;
  -webkit-font-smoothing: none;
`
const TitleBar = styled.div`
  background: linear-gradient( 90deg, #000080, #1084d0 );
  padding: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TitleBarText = styled.div`
  ${Text}
  font-weight: bold;
  color: white;
  letter-spacing: 0;
  margin-right: 24px;
`
const TitleBarControls = styled.div`
  display: flex;
`
const TitleBarControlButton = styled.button`
  box-sizing: border-box;
  border: none;
  background: #c0c0c0;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  border-radius: 0;
  padding: 0;
  display: block;
  min-width: 14px;
  min-height: 12px;
`
const MinimizeButton = styled(TitleBarControlButton)`
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='6' height='2' viewBox='0 0 6 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='6' height='2' fill='black'/%3E %3C/svg%3E");
  background-repeat: no-repeat;
  background-position: bottom 2px left 3px;
`
const MaximizeButton = styled(TitleBarControlButton)`
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='9' height='8' viewBox='0 0 9 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 2V7V8H1H8H9V7V2V0H8H1H0V2ZM8 7V2H1V7H8Z' fill='black'/%3E %3C/svg%3E");
  background-repeat: no-repeat;
  background-position: top 2px left 2px;
`
const CloseButton = styled(TitleBarControlButton)`
  margin-left: 2px;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='7' viewBox='0 0 8 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 0H1H2V1H3V2H4H5V1H6V0H7H8V1H7V2H6V3H5V4H6V5H7V6H8V7H7H6V6H5V5H4H3V6H2V7H1H0V6H1V5H2V4H3V3H2V2H1V1H0V0Z' fill='black'/%3E %3C/svg%3E");
  background-repeat: no-repeat;
  background-position: top 2px center;
`
const WindowBody = styled.div`
  ${Text}
  margin: 2px;
  height: calc(100% - 25px);

  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-corner {
    background: #dfdfdf;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #dfdfdf;
    box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  }
  &::-webkit-scrollbar-track {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='2' height='2' viewBox='0 0 2 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1 0H0V1H1V2H2V1H1V0Z' fill='%23C0C0C0'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 0H1V1H0V2H1V1H2V0Z' fill='white'/%3E %3C/svg%3E");
  }
`
