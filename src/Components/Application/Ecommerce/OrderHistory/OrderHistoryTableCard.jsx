import React from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { H5 } from '../../../../AbstractElements';
import { DatatableOrderhistory } from '../../../../constant';
import OrderHistoryTable from './OrderHistoryTable';

const OrderHistoryTableCard = () => {
  return (
    <Col>
      <Card>
        <CardHeader>
          <H5>{DatatableOrderhistory}</H5>
        </CardHeader>
        <CardBody>
          <OrderHistoryTable />
        </CardBody>
      </Card>
    </Col>
  );
};

export default OrderHistoryTableCard;
