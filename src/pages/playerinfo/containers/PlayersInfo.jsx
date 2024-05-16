import { useIntl } from 'react-intl';
import React, {useState} from 'react';
import Typography from 'components/Typography';
import Card from "../../../components/Card";
import {Link} from "react-router-dom";




function PlayersInfo({players,setPlayers}) {
    const { formatMessage } = useIntl();

    const [newPlayer, setNewPlayer] = useState({ name: '', position: '', age: '' ,team:'' , titles:''});
    const [showNewPlayerInput, setShowNewPlayerInput] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPlayer({ ...newPlayer, [name]: value });
    };

    const handleAddPlayer = () => {

        if (newPlayer.name && newPlayer.position && newPlayer.age && newPlayer.team && newPlayer.titles) {

            if (!isNaN(newPlayer.age)) {
                setPlayers([...players, newPlayer]);
                setNewPlayer({ name: '', position: '', age: '', team: '', titles: '' });
            } else {
                alert('Вік має бути числом.');
            }
        } else {
            alert('Будь ласка, заповніть всі поля.');
        }
    };


    return (
        <>
            <Typography style={{ color: 'gray' }}>
                {formatMessage({ id: 'title' })}
                <div style={{ marginBottom: '20px' }} />
                <Link to={"http://localhost:3050/players?lang=en"}>
                <button>
                    {formatMessage({ id: 'back' })}
                </button>
                </Link>
            </Typography>
            {players.map((player, index) => (
                <div key={index}>
                    <Card flexDirection='row'>
                        <h3>{player.name}</h3>
                        <p>{player.position}</p>
                        <p>{player.age} years old</p>
                        <p>{player.team}</p>


                    </Card>
                    <div style={{ marginBottom: '20px' }} />
                </div>
            ))}
            <button onClick={() => setShowNewPlayerInput(true)}>
                {formatMessage({ id: 'add' })}
            </button>

            {showNewPlayerInput && (
                <div>
                    <input type="text" name="name" placeholder="Name" value={newPlayer.name} onChange={handleInputChange} />
                    <input type="text" name="position" placeholder="Position" value={newPlayer.position} onChange={handleInputChange} />
                    <input type="text" name="age" placeholder="Age" value={newPlayer.age} onChange={handleInputChange} />
                    <input type="text" name="team" placeholder="Team" value={newPlayer.team} onChange={handleInputChange} />
                    <input type="text" name="titles" placeholder="Titles" value={newPlayer.titles} onChange={handleInputChange} />
                    <button onClick={handleAddPlayer}>{formatMessage({ id: 'add' })}</button>
                </div>
            )}
івя

        </>
    );
}

export default PlayersInfo;