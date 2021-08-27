import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';
import './GetDeviceData.css';

const GetData = () => {
  const [deviceData, setDeviceData] = useState([]);
  let fullDeviceArray = [];

  const getDevices = async () => {
    const res = await axios.get(
      'https://graph.microsoft.com/v1.0/deviceManagement/managedDevices?$top=999',
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('msGraphToken')}`,
        },
      }
    );
    res.data.value.map((device) => {
      let deviceArray = [];
      deviceArray.push({
        deviceName: device.deviceName,
        model: device.model,
        serialNumber: device.serialNumber,
        lastSyncDateTime: device.lastSyncDateTime,
        operatingSystem: device.operatingSystem,
        osVersion: device.osVersion,
        isEncrypted: device.isEncrypted,
        complianceState: device.complianceState,
        assetTag: null,
      });

      return axios
        .get(
          `https://graph.microsoft.com/v1.0/devices?$search="displayName: ${device.deviceName}"`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('msGraphToken')}`,
              ConsistencyLevel: 'eventual',
            },
          }
        )
        .then((response) => {
          try {
            deviceArray.assetTag =
              response.data.value[0].extensionAttributes.extensionAttribute1;
          } catch {
            return null;
          }
        })
        .then(() => console.log('response'))
        .then(() => fullDeviceArray.push(deviceArray));
    });
    return fullDeviceArray;
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const setPageData = async () => {
    const res = await getDevices();
    await sleep(10000);
    setDeviceData(res);
  };

  const renderedDevices = deviceData.map((device, i) => {
    console.log(device);
    return (
      <React.Fragment key={i}>
        <div>
          <Card style={{ width: '22rem' }}>
            <Card.Body className='grid-item'>
              <Card.Title>{device[0].deviceName}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                {`${device[0].operatingSystem} ${device[0].osVersion}`}
              </Card.Subtitle>
              <ListGroup variant='flush'>
                <ListGroup.Item>Model: {device[0].model}</ListGroup.Item>
                <ListGroup.Item>
                  <button>Click</button>
                </ListGroup.Item>
                <ListGroup.Item>
                  Serial Number: {device[0].serialNumber}
                </ListGroup.Item>
                <ListGroup.Item>Asset Tag: {device.assetTag}</ListGroup.Item>
                <ListGroup.Item>
                  Last Sign In: {device[0].lastSyncDateTime}
                </ListGroup.Item>
                <ListGroup.Item>
                  Is Encrypted: {device[0].isEncrypted.toString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  Is Compliant: {device[0].complianceState.toString()}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </React.Fragment>
    );
  });
  return (
    <div>
      <Button variant='info' onClick={() => setPageData()}>
        Click Me!!
      </Button>

      <div className='grid-container'>{renderedDevices}</div>
    </div>
  );
};

export default GetData;
