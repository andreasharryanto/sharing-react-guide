import axios from "axios";
import { useRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";

const Edit = forwardRef((props, ref) => {
    const [showEdit, setShowEdit] = useState(false);
    const [editGameId, setEditGameId] = useState(null);

    const titleRef = useRef(null);
    const developerRef = useRef(null);

    useImperativeHandle(ref, () => ({
        alterEditToggle(gameId) {
            setShowEdit(true);
            console.log(gameId);
            setEditGameId(gameId);
        }
    }))
    
    const editData = (gameId) => {
        const url = process.env.REACT_APP_API_URL;
        axios.put(url + "games/" + gameId)
            .then(response => {
                console.log(response);
            });
    }
    const handleEditSubmit = (event) => {
        event.preventDefault();

        const titleEdit = titleRef.current.value;
        const developerEdit = developerRef.current.value;
        if (titleEdit && developerEdit){
            const url = process.env.REACT_APP_API_URL;
            axios.put(url + "games/" + editGameId, {
                title : titleEdit,
                developer: developerEdit
            })
            .then(response => {
                window.location.reload();
            });
        }
        else alert('Please fill all input');
    }

    return (
        <>
            {showEdit ?
                <div>
                    <div style={{width: '100%'}}>
                        <div style={{border: '2px solid grey', borderRadius: 15, margin: '20px 70px 20px 70px', padding: 10, backgroundColor: 'lightgrey', textAlign: 'left', fontSize: 20}}>
                            <h4>{editGameId}</h4>
                            <form onSubmit={handleEditSubmit}>
                                <label>
                                    <span>Title</span><br />
                                    <input type="text" ref={titleRef} />
                                </label><br />
                                <label>
                                <span>Developer :</span><br />
                                    <input type="text" ref={developerRef} />
                                </label><br />
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                    <button onClick={() => setShowEdit(false)}>Cancel</button>
                </div>
                :
                <div>This is Edit section</div>}
        </>
    );
});

export default Edit;