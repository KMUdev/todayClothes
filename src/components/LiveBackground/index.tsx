import React from "react";
import styled from "styled-components";
import useLiveTheme, { Theme } from "../../hooks/useLiveTheme";

type WrapperProps = {
  gradient: typeof Theme;
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  background: linear-gradient(
    ${(props: WrapperProps) => props.gradient[0]},
    ${(props: WrapperProps) => props.gradient[1]}
  );
`;

function LiveBackground() {
  const [status, gradientTop, gradientBottom] = useLiveTheme();

  return <Wrapper gradient={[gradientTop, gradientBottom]}></Wrapper>;
}

export default LiveBackground;
