import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  size: string;
  color: string;
};

interface fontDeco {
  size: string;
  color: string;
}

const TextPresenter = styled.div<fontDeco>`
  ${(props) => props.theme.fontSizes[props.size]};
  ${(props) => props.theme.fontColors[props.color]};
`;

const Text = (props: Props) => {
  return (
    <TextPresenter size={props.size} color={props.color}>
      {props.children}
    </TextPresenter>
  );
};

export default Text;
