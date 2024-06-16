import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomCard = ({ header, title, uri, linkName }) => {
  return (
    <Card className='border border-primary'>
      <Card.Header>
        <Card.Text>{header}</Card.Text>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Link to={uri}>{linkName}</Link>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
