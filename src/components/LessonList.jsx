
function LessonList({ lessons }) {
    return (
        <>
            <ul className="list-group">
                {lessons.map((lesson) => (
                    <li key={lesson.id} className="list-group-item list-group-item-primary">
                        {lesson.title}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default LessonList;