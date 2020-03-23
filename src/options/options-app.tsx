import * as React from 'react';
import fetch from '~/api/clients';

const OptionsApp: React.FC<any> = props => {
  React.useEffect(() => {
    async function fetchData() {
      // eslint-disable-next-line
      console.log(await fetch('getAllBlockeds'));
    }
    fetchData();
  }, []);

  return <div>Options app</div>;
};

export default OptionsApp;
