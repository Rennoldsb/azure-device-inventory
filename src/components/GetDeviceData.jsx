import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';
import './GetDeviceData.css';

const GetData = () => {
  const [deviceData, setDeviceData] = useState([]);

  const onButtonClick = async () => {
    const res = await axios.get('https://graph.microsoft.com/v1.0/devices', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('msGraphToken')}`,
      },
    });
    setDeviceData(res.data.value);
    console.log(deviceData);
  };

  const registeredOwner = async (id) => {
    let res = await axios.get(
      `https://graph.microsoft.com/v1.0/devices/${id}/registeredUsers`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('msGraphToken')}`,
        },
      }
    );
    console.log(res.data.value[0]);
    return res.data.value[0].userPrincipalName;
  };

  const renderedDevices = deviceData.map((device) => {
    return (
      <React.Fragment key={device.id}>
        <div className='grid-item'>
          <Card style={{ width: '22rem' }}>
            <Card.Body>
              <Card.Title>{device.displayName}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                {`${device.operatingSystem} ${device.operatingSystemVersion}`}
              </Card.Subtitle>
              <ListGroup variant='flush'>
                <ListGroup.Item>Model: {device.model}</ListGroup.Item>
                <ListGroup.Item>
                  Asset Tag: {device.extensionAttributes.extensionAttributes1}
                </ListGroup.Item>
                <ListGroup.Item>Owner:</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </React.Fragment>
    );
  });
  return (
    <div>
      <Button variant='info' onClick={() => onButtonClick()}>
        Click Me!!
      </Button>
      <div className='grid-container'>{renderedDevices}</div>
    </div>
  );
};

export default GetData;
