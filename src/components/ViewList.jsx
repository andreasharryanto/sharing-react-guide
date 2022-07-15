import axios from "axios";
import { useRef } from "react";
import Edit from "./Edit";

export default function ViewList (props) {
    const { gameList } = props;
    // console.log(gameList);

    const editRef = useRef(null);

    const deleteData = (gameId) => {
        const url = process.env.REACT_APP_API_URL;
        axios.delete(url + "games/" + gameId)
            .then(response => {
                console.log(response);
            });
        window.location.reload();
    }

    const editData = (gameId) => {
        editRef.current.alterEditToggle(gameId);
    }

    return (
        <>
            <table style={{textAlign: "left"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Developer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gameList.map(e => {
                        return (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.title}</td>
                                <td>{e.developer}</td>
                                <td>
                                    <button onClick={() => editData(e.id)}>Edit</button>
                                    <button onClick={() => deleteData(e.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            <Edit ref={editRef}/>
        </>
    )
}