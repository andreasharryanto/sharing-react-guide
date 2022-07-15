export default function Insert ({insertTrigger, showInsert}) {
    const insertData = () => {
        // access parent function @ Main.jsx
        console.log(showInsert)
        insertTrigger(!showInsert);
    }

    return (
        <button style={{height: 30, width: 100, margin: 10, backgroundColor: 'lightblue'}} onClick={insertData}>Insert</button>
    )
}