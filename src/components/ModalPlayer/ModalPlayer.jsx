function ModalComponent({ player, onClose }) {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                <h2>Name: {player.name}</h2>
                <p>Position: {player.position}</p>
                <p>Age: {player.age}</p>
                <p>Team: {player.team}</p>
                <p>Titles : {player.titles}</p>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ModalComponent