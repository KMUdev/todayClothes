import React from 'react';
import styled from 'styled-components';
import Lottie from '../Lottie/';
import Text from '../Text';

type Props = {
  weather: string;
  title: string;
  contents: Array<string>;
};

const CardWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
`;
const AnimationWrapper = styled.div`
  width: 50%;
  padding: 5%;
`;
const CardTitle2 = styled.div`
  width: 50%;
  padding: 10% 10% 10% 0;
`;
const CardContentsWapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: left;
`;

const index = (props: Props) => {
  return (
    <CardWrapper>
      <AnimationWrapper>
        <Lottie weather={props.weather} />
      </AnimationWrapper>
      <CardTitle2>
        <Text size='base' color='accentText'>
          {props.title}
        </Text>
        <CardContentsWapper>
          {props.contents.map((item) => (
            <Text key={item} size='base' color='whiteText'>
              {item}
            </Text>
          ))}
        </CardContentsWapper>
      </CardTitle2>
    </CardWrapper>
  );
};

export default index;
