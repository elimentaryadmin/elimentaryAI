import Image from 'next/image';
import Link from 'next/link';
import { Alert, Typography, Form, Row, Col, Button } from 'antd';
import styled from 'styled-components';
import { DATA_SOURCES } from '@/utils/enum/dataSources';
import { getDataSource, getPostgresErrorMessage } from './utils';

const StyledForm = styled(Form)`
  border: 1px var(--gray-4) solid;
  border-radius: 4px;
`;

const DataSource = styled.div`
  border: 1px var(--gray-4) solid;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 0;
  min-height: 56px;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
`;

const Card = styled.div`
  background: #fff;
  padding: 32px 40px;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  min-width: 400px;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;

const LogoLabelRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
`;

const DataSourceLabel = styled.span`
  font-size: 24px;
  line-height: 40px;
  font-weight: 500;
  display: inline-block;
  padding-top: 0px;
`;

interface Props {
  dataSource: DATA_SOURCES;
  onNext: (data: any) => void;
  onBack: () => void;
  submitting: boolean;
  connectError?: Record<string, any>;
}

export default function ConnectDataSource(props: Props) {
  const { connectError, dataSource, submitting, onNext, onBack } = props;
  const [form] = Form.useForm();
  const current = getDataSource(dataSource);

  const submit = () => {
    form
      .validateFields()
      .then((values) => {
        onNext && onNext({ properties: values });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <PageWrapper>
      <Card>
        <Typography.Title level={1} className="mb-3">
        </Typography.Title>
        <StyledForm form={form} layout="vertical" className="p-6 my-6">
          <Row align="right" className="mb-6">
            <Col span={24}>
              <DataSource className="d-inline-block px-4 py-2 bg-gray-2 gray-8">
                  <DataSourceLabel>{current.label}</DataSourceLabel>
              </DataSource>
            </Col>
          </Row>
          <current.component />
        </StyledForm>

        {connectError && (
          <Alert
            message={connectError.shortMessage}
            description={
              dataSource === DATA_SOURCES.POSTGRES
                ? getPostgresErrorMessage(connectError)
                : connectError.message
            }
            type="error"
            showIcon
            className="my-6"
          />
        )}

        <ButtonRow>
          <Button
            onClick={onBack}
            size="large"
            className="adm-onboarding-btn"
            disabled={submitting}
          >
            Back
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={submit}
            loading={submitting}
            className="adm-onboarding-btn"
          >
            Next
          </Button>
        </ButtonRow>
      </Card>
    </PageWrapper>
  );
}
