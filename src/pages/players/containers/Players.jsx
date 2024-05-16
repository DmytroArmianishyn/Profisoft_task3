import { useIntl } from 'react-intl';
import React, { useState } from 'react';
import Typography from 'components/Typography';
import Card from "../../../components/Card";
import JsonPlayers from '../players.json'
import Trash from '../../../components/icons/Trash'
import Modal from '../../../components/Modal/Modal'; // Додано імпорт модального вікна


function Players() {
    const { formatMessage } = useIntl();
    const [players, setPlayers] = useState(JsonPlayers);
    const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null); // Додано стан для визначення обраного гравця
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

    return (
        <>
            <Typography style={{ color: 'gray' }}>
                {formatMessage({ id: 'title' })}
            </Typography>
            {players.map((player, index) => (
                <div key={index}>
                    <Card flexDirection='row'>

                        <h3> <a  href='http://localhost:3050/playerinf?lang=en'>{player.name}</a></h3>
                        <p>{player.position}</p>
                        <p>{player.age}</p>
                        <Trash color="red" size={20} onClick={() => handleOpenModal(index)}>
                        </Trash>
                    </Card>
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
            ds
        </>

    );
}

export default Players;