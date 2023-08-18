
function MessageItem({text, author, title, note}){


    return (
        <>
        <div id="message-item">
        <h3>{title}</h3>
        <p>by {author}</p>
        <p>{text}</p>
        <hr></hr>
        <p>{note}</p>
        </div>
        </>
    )
}

export default MessageItem