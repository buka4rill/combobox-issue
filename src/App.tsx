import { Combobox, Option } from '@coachhubio/nova';

import { useEffect, useState } from 'react';

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

const FakeBox = () => {
  return (
    <Combobox
      description="Description"
      error=""
      hint="Hint text"
      label="Label"
      noResult="No results"
      value=""
      onChange={() => {}}
    >
      {org.map((item) => (
        <Option key={item.id} title={item.name} value={item.name} />
      ))}
    </Combobox>
  );
};

function App() {
  // mock api call
  // Imagine this is from an api call

  const [hasFetched, setFetched] = useState(false);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    // imagine this is the value I get directly from the api
    if (!hasFetched) {
      setSelected(org[0].name);
      setFetched(true);
    }
  }, [selected, setSelected]);

  console.log('selected:', selected);
  console.log('hasFetched:', hasFetched);
  return (
    <>
      {!hasFetched ? (
        <FakeBox />
      ) : (
        <Combobox
          description="Description"
          error=""
          hint="Hint text"
          label="Label"
          noResult="No results"
          onChange={setSelected}
          value={selected}
        >
          {org.map((item) => (
            <Option key={item.id} title={item.name} value={item.name} selected={item.name === selected} />
          ))}
        </Combobox>
      )}
    </>
  );
}

export default App;
