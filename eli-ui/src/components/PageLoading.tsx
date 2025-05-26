'use client';

import { Spin } from 'antd';
import styled from 'styled-components';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { ReactNode } from 'react';

interface StyledWrapperProps {
  className?: string;
}

const Wrapper = styled.div<StyledWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: white;
  display: none;
  align-items: center;
  justify-content: center;

  &.isShow {
    display: flex;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
`;

const LoadingText = styled.div`
  margin-top: 8px;
  color: #1890ff;
  font-size: 16px;
`;

interface Props {
  visible?: boolean;
}

interface LoadingProps {
  children?: ReactNode;
  spinning?: boolean;
  loading?: boolean;
  tip?: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}

interface FlexLoadingProps {
  height?: number | string;
  tip?: string;
}

export const defaultIndicator = (
  <LoadingOutlined style={{ fontSize: 36, color: '#1890ff' }} spin />
);

export const Spinner = ({ className = '', size = 36 }) => (
  <LoadingOutlined className={className} style={{ fontSize: size, color: '#1890ff' }} spin />
);

export default function PageLoading(props: Props) {
  const { visible } = props;
  return (
    <Wrapper className={visible ? 'isShow' : ''}>
      <LoadingContainer>
        <Spin indicator={defaultIndicator} />
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    </Wrapper>
  );
}

export const FlexLoading = ({ height, tip }: FlexLoadingProps) => {
  return (
    <div
      style={{ 
        height: height || '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#1890ff'
      }}
    >
      {defaultIndicator}
      {tip && <LoadingText>{tip}</LoadingText>}
    </div>
  );
};

export const Loading = ({
  children,
  spinning = false,
  loading = false,
  tip,
}: LoadingProps) => (
  <Spin indicator={defaultIndicator} spinning={spinning || loading} tip={tip}>
    {children}
  </Spin>
);

interface LoadingWrapperProps {
  loading: boolean;
  tip?: string;
  children: ReactNode;
}

export const LoadingWrapper = ({ loading, tip, children }: LoadingWrapperProps) => {
  if (loading) return <FlexLoading tip={tip} />;
  return <>{children}</>;
};
