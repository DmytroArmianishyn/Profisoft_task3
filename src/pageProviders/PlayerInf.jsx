import PlayersPage from 'pages/playerinfo';
import React from 'react';

import PageContainer from './components/PageContainer';

const PlayerInf = (props) => {
    return (
        <PageContainer>
            <PlayersPage {...props} />
        </PageContainer>
    );
};

export default PlayerInf;
