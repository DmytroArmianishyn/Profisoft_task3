import { useIntl } from 'react-intl';
import React, {useEffect, useState} from 'react';
import Typography from 'components/Typography';
import Card from "../../../components/Card";
import Trash from '../../../components/icons/Trash'
import Modal from '../../../components/Modal/Modal'; // Додано імпорт модального вікна
import Button from "../../../components/Button";
import {Link, useNavigate} from "react-router-dom";





function Players({players,setPlayers,setPlayer,onPlayerClick}) {
    const navigate = useNavigate()
    const { formatMessage } = useIntl();
    const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
    const [message, setMessage] = useState('');


    const handleDelete = (index) => {
        const newPlayers = [...players];
        newPlayers.splice(index, 1);
        setPlayers(newPlayers);
        setSelectedPlayerIndex(null);
        setMessage('Гравець був успішно видалений.');
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const handleOpenModal = (index) => {
        setSelectedPlayerIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedPlayerIndex(null);
    };

    const handleConfirmDelete = () => {
        if (selectedPlayerIndex !== null) {
            handleDelete(selectedPlayerIndex);
        }
    };
    const [sortBy, setSortBy] = useState('input');


    let sortedPlayers;

    if (sortBy === 'input') sortedPlayers = players;
    if (sortBy === 'name') {
        sortedPlayers = players
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === 'age') {
        sortedPlayers = players
            .slice()
            .sort((a, b) => Number(a.age) - Number(b.age));
    }





    return (
        <div style={{position:'absolute'}}>
            <Typography style={{ color: 'gray' }}>
                {formatMessage({ id: 'title' })}
                <Link to={'http://localhost:3050/playerinf?lang=en'}>
                    <Button>  {formatMessage({ id: 'add' })}  </Button>
                </Link>
            </Typography>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="input">Sort by order</option>
                <option value="name">Sort by name</option>
                <option value="age">Sort by age </option>
            </select>
            {sortedPlayers.map((player, index) => (
                <div key={index}>
                    {/*<Link to={`addPlayer/${player.id}`} relative="path">*/}
                    <button  onClick={()=>onPlayerClick(player)}>

                    <Card flexDirection='row'>

                        <h3>{player.name}</h3>
                        <p>{player.age}  years old</p>


                        <Link to={'http://localhost:3050/playerinf?lang=en'}>
                            <Button>  {formatMessage({ id: 'change' })}  </Button>
                        </Link>


                    </Card>
                    </button>

                    {/*</Link>*/}
                    <Trash color="red" size={20} onClick={() => handleOpenModal(index)}/>
                    <div style={{ marginBottom: '20px' }} />
                </div>
            ))}

            <Modal
                isOpen={selectedPlayerIndex !== null}
                onClose={handleCloseModal}
                title="Підтвердіть видалення"
                confirmText="Підтвердити"
                onConfirm={handleConfirmDelete}
            >
                Ви впевнені, що хочете видалити цього гравця?
            </Modal>
            {message && <div style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
        </div>
    );
}

export default Players;