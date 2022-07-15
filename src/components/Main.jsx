import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";
import Insert from "./Insert";
import ViewList from "./ViewList";

export default function Main() {
    const [gameList, setGameList] = useState([]);

    const [showInsert, setShowInsert] = useState(false);

    const titleRef = useRef(null);
    const developerRef = useRef(null);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL;
        axios.get(url + "games")
            .then(res => {
                // console.log(res.data);
                setGameList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const changeDisplayInsert = (showFlag) => {
        console.log('final' + showFlag);
        setShowInsert(showFlag);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const titleInsert = titleRef.current.value;
        const developerInsert = developerRef.current.value;
        if (titleInsert && developerInsert){
            const url = process.env.REACT_APP_API_URL;
            axios.post(url + "games", {
                title : titleInsert,
                developer: developerInsert
            })
            .then(response => {
                console.log(response.data);
                window.location.reload();
            });
        }
        else alert('Please fill all input');
    }

    const borderStyle = {border: '2px solid grey', borderRadius: 15};

    return (
        <div>
            <div style={{width: '100%', height: 50, backgroundColor: 'darkblue', textAlign: 'left'}}>
                <Insert insertTrigger={changeDisplayInsert} showInsert={showInsert} />
            </div>

            {showInsert && (
                <div style={{width: '100%'}}>
                    <div style={{...borderStyle, margin: '20px 70px 20px 70px', padding: 10, backgroundColor: 'lightgrey', textAlign: 'left', fontSize: 20}}>
                        <form onSubmit={handleSubmit}>
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
            )}
            
            {gameList && gameList.length > 0 && <ViewList gameList={gameList} />}
        </div>
    )
}