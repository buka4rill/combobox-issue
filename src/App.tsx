import { Combobox, Option } from '@coachhubio/nova';

import { useEffect, useState } from 'react';

function App() {
  // mock api call
  // Imagine this is from an api call
  const org = [
    {
      id: '1',
      name: 'Org 1',
    },
    {
      id: '2',
      name: 'Org 2',
    },
  ];

  const [label, setLabel] = useState('');
  const [selected, setSelected] = useState('');

  useEffect(() => {
    // imagine this is the value I get directly from the api
    setLabel(org[0].name);
  }, [label]);

  console.log('label from api:', label);
  console.log('label selected:', selected);
  return (
    <Combobox
      description="Description"
      error=""
      hint="Hint text"
      label="Label"
      noResult="No results"
      onChange={setSelected}
      placeholder={`doing this to test label: ${label}`}
      value={label} // I should see this value when the page loads
    >
      {org.map((item) => (
        <Option key={item.id} title={item.name} value={item.name} selected={item.name === label} />
      ))}
    </Combobox>
  );
}

export default App;
