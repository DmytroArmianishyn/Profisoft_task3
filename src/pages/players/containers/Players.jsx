import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';
import Card from "../../../components/Card";
import JsonPlayers from '../players.json'

function Players() {
    const { formatMessage } = useIntl();

    return (
        <>
        <Typography >
            {formatMessage({ id: 'title' })}
        </Typography>
            {JsonPlayers.map(player => (
                <Card flexDirection='row'>
                   <h3>{player.name}</h3>
                    <p>{ player.position }</p>
                    <p>{ player.age}</p>
                </Card>
            ))}

        </>
    );
}

export default Players;
