
function MessageItem({text, author, title, note, date, hr}){


    return (
        <>
        <div id="message-item">
        <h3>{title}</h3>
        <p>by {author}</p>
        <p>{date}</p>
        <p>{text}</p>
        {hr}
        <p>{note}</p>
        </div>
        </>
    )
}

export default MessageItem