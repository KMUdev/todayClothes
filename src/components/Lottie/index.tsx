import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import lottie from 'lottie-web';

type Props = {
  weather: string;
};

const Animation = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 1000;
`;

const Lottie = (props: Props) => {
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current as HTMLElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require(`../../../public/assets/Weather/${props.weather}.json`),
    });
  });

  return <Animation ref={lottieRef} />;
};

export default Lottie;
