import React, { useState } from 'react';
import { callMsGraphGet } from '../helpers/GraphCalls';
import { GetToken } from '../helpers/GetToken';

function GetData(props) {
  const meData = callMsGraphGet(props.apiEndpoint);
  const [displayName, setDisplayName] = useState(null);
  meData.then((res) => {
    setDisplayName(res.displayName);
  });

  return (
    <div>
      <GetToken />
      <p>Welcome {displayName}!</p>
    </div>
  );
}

export default GetData;
