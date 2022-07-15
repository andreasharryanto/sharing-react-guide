export default function ViewList (props) {
    const { gameList } = props;
    // console.log(gameList);

    return (
        <table style={{textAlign: "left"}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                {gameList.map(e => {
                    return (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.title}</td>
                            <td>{e.author}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}