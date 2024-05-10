import PlayersPage from 'pages/players';
import React from 'react';

import PageContainer from './components/PageContainer';

const Players = (props) => {
    return (
        <PageContainer>
            <PlayersPage {...props} />
        </PageContainer>
    );
};

export default Players;
