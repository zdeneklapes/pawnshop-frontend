'use client'
import {useState} from 'react'

export interface ButtonProps {
  count: number,
  onClick: () => void
}

const Button = (props: ButtonProps) => {
  return <button onClick={props.onClick}>Clicked {props.count} times</button>
}

export default Button
