import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';
import Button from "../../../components/Button";
import {Link} from "react-router-dom";

function Default() {
  const { formatMessage } = useIntl();

  return (
      <>
    <Typography>
      {formatMessage({ id: 'title' })}
    </Typography>
  <Link to={"http://localhost:3050/players?lang=en"}>
    <Button>
      Players
    </Button>
  </Link>
      </>

  );
}

export default Default;
