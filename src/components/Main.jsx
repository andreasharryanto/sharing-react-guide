import axios from "axios";
import { useEffect, useState } from "react";
import Insert from "./Insert";
import ViewList from "./ViewList";
export default function Main() {
    const [gameList, setGameList] = useState([]);

    const [showInsert, setShowInsert] = useState(false);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL;
        axios.get(url + "posts")
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
        console.log(event);
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
                                Name:
                                <input type="text" />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            )}

            {gameList && gameList.length > 0 && <ViewList gameList={gameList} />}
        </div>
    )
}